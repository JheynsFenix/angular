'use strict';"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var compile_metadata_1 = require('./compile_metadata');
var di_1 = require('angular2/src/core/di');
var style_compiler_1 = require('./style_compiler');
var view_compiler_1 = require('./view_compiler/view_compiler');
var template_parser_1 = require('./template_parser');
var directive_normalizer_1 = require('./directive_normalizer');
var runtime_metadata_1 = require('./runtime_metadata');
var component_factory_1 = require('angular2/src/core/linker/component_factory');
var config_1 = require('./config');
var ir = require('./output/output_ast');
var output_jit_1 = require('./output/output_jit');
var output_interpreter_1 = require('./output/output_interpreter');
var interpretive_view_1 = require('./output/interpretive_view');
var xhr_1 = require('angular2/src/compiler/xhr');
/**
 * An internal module of the Angular compiler that begins with component types,
 * extracts templates, and eventually produces a compiled version of the component
 * ready for linking into an application.
 */
var RuntimeCompiler = (function () {
    function RuntimeCompiler(_runtimeMetadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _viewCompiler, _xhr, _genConfig) {
        this._runtimeMetadataResolver = _runtimeMetadataResolver;
        this._templateNormalizer = _templateNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._xhr = _xhr;
        this._genConfig = _genConfig;
        this._styleCache = new Map();
        this._hostCacheKeys = new Map();
        this._compiledTemplateCache = new Map();
        this._compiledTemplateDone = new Map();
    }
    RuntimeCompiler.prototype.resolveComponent = function (componentType) {
        var compMeta = this._runtimeMetadataResolver.getDirectiveMetadata(componentType);
        var hostCacheKey = this._hostCacheKeys.get(componentType);
        if (lang_1.isBlank(hostCacheKey)) {
            hostCacheKey = new Object();
            this._hostCacheKeys.set(componentType, hostCacheKey);
            assertComponent(compMeta);
            var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
            this._loadAndCompileComponent(hostCacheKey, hostMeta, [compMeta], [], []);
        }
        return this._compiledTemplateDone.get(hostCacheKey)
            .then(function (compiledTemplate) { return new component_factory_1.ComponentFactory(compMeta.selector, compiledTemplate.viewFactory, componentType); });
    };
    RuntimeCompiler.prototype.clearCache = function () {
        this._styleCache.clear();
        this._compiledTemplateCache.clear();
        this._compiledTemplateDone.clear();
        this._hostCacheKeys.clear();
    };
    RuntimeCompiler.prototype._loadAndCompileComponent = function (cacheKey, compMeta, viewDirectives, pipes, compilingComponentsPath) {
        var _this = this;
        var compiledTemplate = this._compiledTemplateCache.get(cacheKey);
        var done = this._compiledTemplateDone.get(cacheKey);
        if (lang_1.isBlank(compiledTemplate)) {
            compiledTemplate = new CompiledTemplate();
            this._compiledTemplateCache.set(cacheKey, compiledTemplate);
            done =
                async_1.PromiseWrapper.all([this._compileComponentStyles(compMeta)].concat(viewDirectives.map(function (dirMeta) { return _this._templateNormalizer.normalizeDirective(dirMeta); })))
                    .then(function (stylesAndNormalizedViewDirMetas) {
                    var normalizedViewDirMetas = stylesAndNormalizedViewDirMetas.slice(1);
                    var styles = stylesAndNormalizedViewDirMetas[0];
                    var parsedTemplate = _this._templateParser.parse(compMeta, compMeta.template.template, normalizedViewDirMetas, pipes, compMeta.type.name);
                    var childPromises = [];
                    compiledTemplate.init(_this._compileComponent(compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises));
                    return async_1.PromiseWrapper.all(childPromises).then(function (_) { return compiledTemplate; });
                });
            this._compiledTemplateDone.set(cacheKey, done);
        }
        return compiledTemplate;
    };
    RuntimeCompiler.prototype._compileComponent = function (compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises) {
        var _this = this;
        var compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, new ir.ExternalExpr(new compile_metadata_1.CompileIdentifierMetadata({ runtime: styles })), pipes);
        compileResult.dependencies.forEach(function (dep) {
            var childCompilingComponentsPath = collection_1.ListWrapper.clone(compilingComponentsPath);
            var childCacheKey = dep.comp.type.runtime;
            var childViewDirectives = _this._runtimeMetadataResolver.getViewDirectivesMetadata(dep.comp.type.runtime);
            var childViewPipes = _this._runtimeMetadataResolver.getViewPipesMetadata(dep.comp.type.runtime);
            var childIsRecursive = collection_1.ListWrapper.contains(childCompilingComponentsPath, childCacheKey);
            childCompilingComponentsPath.push(childCacheKey);
            var childComp = _this._loadAndCompileComponent(dep.comp.type.runtime, dep.comp, childViewDirectives, childViewPipes, childCompilingComponentsPath);
            dep.factoryPlaceholder.runtime = childComp.proxyViewFactory;
            dep.factoryPlaceholder.name = "viewFactory_" + dep.comp.type.name;
            if (!childIsRecursive) {
                // Only wait for a child if it is not a cycle
                childPromises.push(_this._compiledTemplateDone.get(childCacheKey));
            }
        });
        var factory;
        if (lang_1.IS_DART || !this._genConfig.useJit) {
            factory = output_interpreter_1.interpretStatements(compileResult.statements, compileResult.viewFactoryVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
        }
        else {
            factory = output_jit_1.jitStatements(compMeta.type.name + ".template.js", compileResult.statements, compileResult.viewFactoryVar);
        }
        return factory;
    };
    RuntimeCompiler.prototype._compileComponentStyles = function (compMeta) {
        var compileResult = this._styleCompiler.compileComponent(compMeta);
        return this._resolveStylesCompileResult(compMeta.type.name, compileResult);
    };
    RuntimeCompiler.prototype._resolveStylesCompileResult = function (sourceUrl, result) {
        var _this = this;
        var promises = result.dependencies.map(function (dep) { return _this._loadStylesheetDep(dep); });
        return async_1.PromiseWrapper.all(promises)
            .then(function (cssTexts) {
            var nestedCompileResultPromises = [];
            for (var i = 0; i < result.dependencies.length; i++) {
                var dep = result.dependencies[i];
                var cssText = cssTexts[i];
                var nestedCompileResult = _this._styleCompiler.compileStylesheet(dep.sourceUrl, cssText, dep.isShimmed);
                nestedCompileResultPromises.push(_this._resolveStylesCompileResult(dep.sourceUrl, nestedCompileResult));
            }
            return async_1.PromiseWrapper.all(nestedCompileResultPromises);
        })
            .then(function (nestedStylesArr) {
            for (var i = 0; i < result.dependencies.length; i++) {
                var dep = result.dependencies[i];
                dep.valuePlaceholder.runtime = nestedStylesArr[i];
                dep.valuePlaceholder.name = "importedStyles" + i;
            }
            if (lang_1.IS_DART || !_this._genConfig.useJit) {
                return output_interpreter_1.interpretStatements(result.statements, result.stylesVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
            }
            else {
                return output_jit_1.jitStatements(sourceUrl + ".css.js", result.statements, result.stylesVar);
            }
        });
    };
    RuntimeCompiler.prototype._loadStylesheetDep = function (dep) {
        var cacheKey = "" + dep.sourceUrl + (dep.isShimmed ? '.shim' : '');
        var cssTextPromise = this._styleCache.get(cacheKey);
        if (lang_1.isBlank(cssTextPromise)) {
            cssTextPromise = this._xhr.get(dep.sourceUrl);
            this._styleCache.set(cacheKey, cssTextPromise);
        }
        return cssTextPromise;
    };
    RuntimeCompiler = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [runtime_metadata_1.RuntimeMetadataResolver, directive_normalizer_1.DirectiveNormalizer, template_parser_1.TemplateParser, style_compiler_1.StyleCompiler, view_compiler_1.ViewCompiler, xhr_1.XHR, config_1.CompilerConfig])
    ], RuntimeCompiler);
    return RuntimeCompiler;
}());
exports.RuntimeCompiler = RuntimeCompiler;
var CompiledTemplate = (function () {
    function CompiledTemplate() {
        var _this = this;
        this.viewFactory = null;
        this.proxyViewFactory = function (viewUtils, childInjector, contextEl) {
            return _this.viewFactory(viewUtils, childInjector, contextEl);
        };
    }
    CompiledTemplate.prototype.init = function (viewFactory) { this.viewFactory = viewFactory; };
    return CompiledTemplate;
}());
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUXJPcVNETDAudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9ydW50aW1lX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFRTywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xDLDJCQUE0QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdELDJCQUtPLGdDQUFnQyxDQUFDLENBQUE7QUFDeEMsc0JBQTZCLDJCQUEyQixDQUFDLENBQUE7QUFDekQsaUNBUU8sb0JBQW9CLENBQUMsQ0FBQTtBQWlCNUIsbUJBQXlCLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsK0JBQTBFLGtCQUFrQixDQUFDLENBQUE7QUFDN0YsOEJBQTJCLCtCQUErQixDQUFDLENBQUE7QUFDM0QsZ0NBQTZCLG1CQUFtQixDQUFDLENBQUE7QUFDakQscUNBQWtDLHdCQUF3QixDQUFDLENBQUE7QUFDM0QsaUNBQXNDLG9CQUFvQixDQUFDLENBQUE7QUFDM0Qsa0NBQStCLDRDQUE0QyxDQUFDLENBQUE7QUFNNUUsdUJBQTZCLFVBQVUsQ0FBQyxDQUFBO0FBQ3hDLElBQVksRUFBRSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDMUMsMkJBQTRCLHFCQUFxQixDQUFDLENBQUE7QUFDbEQsbUNBQWtDLDZCQUE2QixDQUFDLENBQUE7QUFDaEUsa0NBQWlELDRCQUE0QixDQUFDLENBQUE7QUFFOUUsb0JBQWtCLDJCQUEyQixDQUFDLENBQUE7QUFFOUM7Ozs7R0FJRztBQUVIO0lBTUUseUJBQW9CLHdCQUFpRCxFQUNqRCxtQkFBd0MsRUFDeEMsZUFBK0IsRUFBVSxjQUE2QixFQUN0RSxhQUEyQixFQUFVLElBQVMsRUFDOUMsVUFBMEI7UUFKMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUF5QjtRQUNqRCx3QkFBbUIsR0FBbkIsbUJB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QUFDO1FBRzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUztZQUN4RCxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUM7UUFBckQsQ0FBcUQsQ0FBQztJQUM1RCxDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLFdBQXFCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLHVCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFFRCx5QkFBeUIsSUFBOEI7SUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLElBQUksMEJBQWEsQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHFDQUFrQyxDQUFDLENBQUM7SUFDbEcsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJU19EQVJULFxuICBUeXBlLFxuICBKc29uLFxuICBpc0JsYW5rLFxuICBpc1ByZXNlbnQsXG4gIHN0cmluZ2lmeSxcbiAgZXZhbEV4cHJlc3Npb25cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxuICBTZXRXcmFwcGVyLFxuICBNYXBXcmFwcGVyLFxuICBTdHJpbmdNYXBXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7XG4gIGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhLFxuICBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gIENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gIENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhLFxuICBDb21waWxlUGlwZU1ldGFkYXRhLFxuICBDb21waWxlTWV0YWRhdGFXaXRoVHlwZSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVxufSBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtcbiAgVGVtcGxhdGVBc3QsXG4gIFRlbXBsYXRlQXN0VmlzaXRvcixcbiAgTmdDb250ZW50QXN0LFxuICBFbWJlZGRlZFRlbXBsYXRlQXN0LFxuICBFbGVtZW50QXN0LFxuICBWYXJpYWJsZUFzdCxcbiAgQm91bmRFdmVudEFzdCxcbiAgQm91bmRFbGVtZW50UHJvcGVydHlBc3QsXG4gIEF0dHJBc3QsXG4gIEJvdW5kVGV4dEFzdCxcbiAgVGV4dEFzdCxcbiAgRGlyZWN0aXZlQXN0LFxuICBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LFxuICB0ZW1wbGF0ZVZpc2l0QWxsXG59IGZyb20gJy4vdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtTdHlsZUNvbXBpbGVyLCBTdHlsZXNDb21waWxlRGVwZW5kZW5jeSwgU3R5bGVzQ29tcGlsZVJlc3VsdH0gZnJvbSAnLi9zdHlsZV9jb21waWxlcic7XG5pbXBvcnQge1ZpZXdDb21waWxlcn0gZnJvbSAnLi92aWV3X2NvbXBpbGVyL3ZpZXdfY29tcGlsZXInO1xuaW1wb3J0IHtUZW1wbGF0ZVBhcnNlcn0gZnJvbSAnLi90ZW1wbGF0ZV9wYXJzZXInO1xuaW1wb3J0IHtEaXJlY3RpdmVOb3JtYWxpemVyfSBmcm9tICcuL2RpcmVjdGl2ZV9ub3JtYWxpemVyJztcbmltcG9ydCB7UnVudGltZU1ldGFkYXRhUmVzb2x2ZXJ9IGZyb20gJy4vcnVudGltZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge1xuICBDb21wb25lbnRSZXNvbHZlcixcbiAgUmVmbGVjdG9yQ29tcG9uZW50UmVzb2x2ZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9yZXNvbHZlcic7XG5cbmltcG9ydCB7Q29tcGlsZXJDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCAqIGFzIGlyIGZyb20gJy4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtqaXRTdGF0ZW1lbnRzfSBmcm9tICcuL291dHB1dC9vdXRwdXRfaml0JztcbmltcG9ydCB7aW50ZXJwcmV0U3RhdGVtZW50c30gZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2ludGVycHJldGVyJztcbmltcG9ydCB7SW50ZXJwcmV0aXZlQXBwVmlld0luc3RhbmNlRmFjdG9yeX0gZnJvbSAnLi9vdXRwdXQvaW50ZXJwcmV0aXZlX3ZpZXcnO1xuXG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgbW9kdWxlIG9mIHRoZSBBbmd1bGFyIGNvbXBpbGVyIHRoYXQgYmVnaW5zIHdpdGggY29tcG9uZW50IHR5cGVzLFxuICogZXh0cmFjdHMgdGVtcGxhdGVzLCBhbmQgZXZlbnR1YWxseSBwcm9kdWNlcyBhIGNvbXBpbGVkIHZlcnNpb24gb2YgdGhlIGNvbXBvbmVudFxuICogcmVhZHkgZm9yIGxpbmtpbmcgaW50byBhbiBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJ1bnRpbWVDb21waWxlciBpbXBsZW1lbnRzIENvbXBvbmVudFJlc29sdmVyIHtcbiAgcHJpdmF0ZSBfc3R5bGVDYWNoZTogTWFwPHN0cmluZywgUHJvbWlzZTxzdHJpbmc+PiA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPHN0cmluZz4+KCk7XG4gIHByaXZhdGUgX2hvc3RDYWNoZUtleXMgPSBuZXcgTWFwPFR5cGUsIGFueT4oKTtcbiAgcHJpdmF0ZSBfY29tcGlsZWRUZW1wbGF0ZUNhY2hlID0gbmV3IE1hcDxhbnksIENvbXBpbGVkVGVtcGxhdGU+KCk7XG4gIHByaXZhdGUgX2NvbXBpbGVkVGVtcGxhdGVEb25lID0gbmV3IE1hcDxhbnksIFByb21pc2U8Q29tcGlsZWRUZW1wbGF0ZT4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcnVudGltZU1ldGFkYXRhUmVzb2x2ZXI6IFJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF90ZW1wbGF0ZU5vcm1hbGl6ZXI6IERpcmVjdGl2ZU5vcm1hbGl6ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3RlbXBsYXRlUGFyc2VyOiBUZW1wbGF0ZVBhcnNlciwgcHJpdmF0ZSBfc3R5bGVDb21waWxlcjogU3R5bGVDb21waWxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlld0NvbXBpbGVyOiBWaWV3Q29tcGlsZXIsIHByaXZhdGUgX3hocjogWEhSLFxuICAgICAgICAgICAgICBwcml2YXRlIF9nZW5Db25maWc6IENvbXBpbGVyQ29uZmlnKSB7fVxuXG4gIHJlc29sdmVDb21wb25lbnQoY29tcG9uZW50VHlwZTogVHlwZSk6IFByb21pc2U8Q29tcG9uZW50RmFjdG9yeT4ge1xuICAgIHZhciBjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhID1cbiAgICAgICAgdGhpcy5fcnVudGltZU1ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoY29tcG9uZW50VHlwZSk7XG4gICAgdmFyIGhvc3RDYWNoZUtleSA9IHRoaXMuX2hvc3RDYWNoZUtleXMuZ2V0KGNvbXBvbmVudFR5cGUpO1xuICAgIGlmIChpc0JsYW5rKGhvc3RDYWNoZUtleSkpIHtcbiAgICAgIGhvc3RDYWNoZUtleSA9IG5ldyBPYmplY3QoKTtcbiAgICAgIHRoaXMuX2hvc3RDYWNoZUtleXMuc2V0KGNvbXBvbmVudFR5cGUsIGhvc3RDYWNoZUtleSk7XG4gICAgICBhc3NlcnRDb21wb25lbnQoY29tcE1ldGEpO1xuICAgICAgdmFyIGhvc3RNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEgPVxuICAgICAgICAgIGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhKGNvbXBNZXRhLnR5cGUsIGNvbXBNZXRhLnNlbGVjdG9yKTtcblxuICAgICAgdGhpcy5fbG9hZEFuZENvbXBpbGVDb21wb25lbnQoaG9zdENhY2hlS2V5LCBob3N0TWV0YSwgW2NvbXBNZXRhXSwgW10sIFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVEb25lLmdldChob3N0Q2FjaGVLZXkpXG4gICAgICAgIC50aGVuKChjb21waWxlZFRlbXBsYXRlOiBDb21waWxlZFRlbXBsYXRlKSA9PiBuZXcgQ29tcG9uZW50RmFjdG9yeShcbiAgICAgICAgICAgICAgICAgIGNvbXBNZXRhLnNlbGVjdG9yLCBjb21waWxlZFRlbXBsYXRlLnZpZXdGYWN0b3J5LCBjb21wb25lbnRUeXBlKSk7XG4gIH1cblxuICBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuX3N0eWxlQ2FjaGUuY2xlYXIoKTtcbiAgICB0aGlzLl9jb21waWxlZFRlbXBsYXRlQ2FjaGUuY2xlYXIoKTtcbiAgICB0aGlzLl9jb21waWxlZFRlbXBsYXRlRG9uZS5jbGVhcigpO1xuICAgIHRoaXMuX2hvc3RDYWNoZUtleXMuY2xlYXIoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfbG9hZEFuZENvbXBpbGVDb21wb25lbnQoY2FjaGVLZXk6IGFueSwgY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0RpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxpbmdDb21wb25lbnRzUGF0aDogYW55W10pOiBDb21waWxlZFRlbXBsYXRlIHtcbiAgICB2YXIgY29tcGlsZWRUZW1wbGF0ZSA9IHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVDYWNoZS5nZXQoY2FjaGVLZXkpO1xuICAgIHZhciBkb25lID0gdGhpcy5fY29tcGlsZWRUZW1wbGF0ZURvbmUuZ2V0KGNhY2hlS2V5KTtcbiAgICBpZiAoaXNCbGFuayhjb21waWxlZFRlbXBsYXRlKSkge1xuICAgICAgY29tcGlsZWRUZW1wbGF0ZSA9IG5ldyBDb21waWxlZFRlbXBsYXRlKCk7XG4gICAgICB0aGlzLl9jb21waWxlZFRlbXBsYXRlQ2FjaGUuc2V0KGNhY2hlS2V5LCBjb21waWxlZFRlbXBsYXRlKTtcbiAgICAgIGRvbmUgPVxuICAgICAgICAgIFByb21pc2VXcmFwcGVyLmFsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbPGFueT50aGlzLl9jb21waWxlQ29tcG9uZW50U3R5bGVzKGNvbXBNZXRhKV0uY29uY2F0KHZpZXdEaXJlY3RpdmVzLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyTWV0YSA9PiB0aGlzLl90ZW1wbGF0ZU5vcm1hbGl6ZXIubm9ybWFsaXplRGlyZWN0aXZlKGRpck1ldGEpKSkpXG4gICAgICAgICAgICAgIC50aGVuKChzdHlsZXNBbmROb3JtYWxpemVkVmlld0Rpck1ldGFzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBub3JtYWxpemVkVmlld0Rpck1ldGFzID0gc3R5bGVzQW5kTm9ybWFsaXplZFZpZXdEaXJNZXRhcy5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gc3R5bGVzQW5kTm9ybWFsaXplZFZpZXdEaXJNZXRhc1swXTtcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VkVGVtcGxhdGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZVBhcnNlci5wYXJzZShjb21wTWV0YSwgY29tcE1ldGEudGVtcGxhdGUudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRWaWV3RGlyTWV0YXMsIHBpcGVzLCBjb21wTWV0YS50eXBlLm5hbWUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkUHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBjb21waWxlZFRlbXBsYXRlLmluaXQodGhpcy5fY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSwgcGFyc2VkVGVtcGxhdGUsIHN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlcywgY29tcGlsaW5nQ29tcG9uZW50c1BhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRQcm9taXNlcykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwoY2hpbGRQcm9taXNlcykudGhlbigoXykgPT4geyByZXR1cm4gY29tcGlsZWRUZW1wbGF0ZTsgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgdGhpcy5fY29tcGlsZWRUZW1wbGF0ZURvbmUuc2V0KGNhY2hlS2V5LCBkb25lKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBpbGVkVGVtcGxhdGU7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlQ29tcG9uZW50KGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIHBhcnNlZFRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogc3RyaW5nW10sIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGlsaW5nQ29tcG9uZW50c1BhdGg6IGFueVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkUHJvbWlzZXM6IFByb21pc2U8YW55PltdKTogRnVuY3Rpb24ge1xuICAgIHZhciBjb21waWxlUmVzdWx0ID0gdGhpcy5fdmlld0NvbXBpbGVyLmNvbXBpbGVDb21wb25lbnQoXG4gICAgICAgIGNvbXBNZXRhLCBwYXJzZWRUZW1wbGF0ZSxcbiAgICAgICAgbmV3IGlyLkV4dGVybmFsRXhwcihuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7cnVudGltZTogc3R5bGVzfSkpLCBwaXBlcyk7XG4gICAgY29tcGlsZVJlc3VsdC5kZXBlbmRlbmNpZXMuZm9yRWFjaCgoZGVwKSA9PiB7XG4gICAgICB2YXIgY2hpbGRDb21waWxpbmdDb21wb25lbnRzUGF0aCA9IExpc3RXcmFwcGVyLmNsb25lKGNvbXBpbGluZ0NvbXBvbmVudHNQYXRoKTtcblxuICAgICAgdmFyIGNoaWxkQ2FjaGVLZXkgPSBkZXAuY29tcC50eXBlLnJ1bnRpbWU7XG4gICAgICB2YXIgY2hpbGRWaWV3RGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10gPVxuICAgICAgICAgIHRoaXMuX3J1bnRpbWVNZXRhZGF0YVJlc29sdmVyLmdldFZpZXdEaXJlY3RpdmVzTWV0YWRhdGEoZGVwLmNvbXAudHlwZS5ydW50aW1lKTtcbiAgICAgIHZhciBjaGlsZFZpZXdQaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdID1cbiAgICAgICAgICB0aGlzLl9ydW50aW1lTWV0YWRhdGFSZXNvbHZlci5nZXRWaWV3UGlwZXNNZXRhZGF0YShkZXAuY29tcC50eXBlLnJ1bnRpbWUpO1xuICAgICAgdmFyIGNoaWxkSXNSZWN1cnNpdmUgPSBMaXN0V3JhcHBlci5jb250YWlucyhjaGlsZENvbXBpbGluZ0NvbXBvbmVudHNQYXRoLCBjaGlsZENhY2hlS2V5KTtcbiAgICAgIGNoaWxkQ29tcGlsaW5nQ29tcG9uZW50c1BhdGgucHVzaChjaGlsZENhY2hlS2V5KTtcblxuICAgICAgdmFyIGNoaWxkQ29tcCA9XG4gICAgICAgICAgdGhpcy5fbG9hZEFuZENvbXBpbGVDb21wb25lbnQoZGVwLmNvbXAudHlwZS5ydW50aW1lLCBkZXAuY29tcCwgY2hpbGRWaWV3RGlyZWN0aXZlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFZpZXdQaXBlcywgY2hpbGRDb21waWxpbmdDb21wb25lbnRzUGF0aCk7XG4gICAgICBkZXAuZmFjdG9yeVBsYWNlaG9sZGVyLnJ1bnRpbWUgPSBjaGlsZENvbXAucHJveHlWaWV3RmFjdG9yeTtcbiAgICAgIGRlcC5mYWN0b3J5UGxhY2Vob2xkZXIubmFtZSA9IGB2aWV3RmFjdG9yeV8ke2RlcC5jb21wLnR5cGUubmFtZX1gO1xuICAgICAgaWYgKCFjaGlsZElzUmVjdXJzaXZlKSB7XG4gICAgICAgIC8vIE9ubHkgd2FpdCBmb3IgYSBjaGlsZCBpZiBpdCBpcyBub3QgYSBjeWNsZVxuICAgICAgICBjaGlsZFByb21pc2VzLnB1c2godGhpcy5fY29tcGlsZWRUZW1wbGF0ZURvbmUuZ2V0KGNoaWxkQ2FjaGVLZXkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgZmFjdG9yeTtcbiAgICBpZiAoSVNfREFSVCB8fCAhdGhpcy5fZ2VuQ29uZmlnLnVzZUppdCkge1xuICAgICAgZmFjdG9yeSA9IGludGVycHJldFN0YXRlbWVudHMoY29tcGlsZVJlc3VsdC5zdGF0ZW1lbnRzLCBjb21waWxlUmVzdWx0LnZpZXdGYWN0b3J5VmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEludGVycHJldGl2ZUFwcFZpZXdJbnN0YW5jZUZhY3RvcnkoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhY3RvcnkgPSBqaXRTdGF0ZW1lbnRzKGAke2NvbXBNZXRhLnR5cGUubmFtZX0udGVtcGxhdGUuanNgLCBjb21waWxlUmVzdWx0LnN0YXRlbWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxlUmVzdWx0LnZpZXdGYWN0b3J5VmFyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhY3Rvcnk7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlQ29tcG9uZW50U3R5bGVzKGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgdmFyIGNvbXBpbGVSZXN1bHQgPSB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVDb21wb25lbnQoY29tcE1ldGEpO1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlU3R5bGVzQ29tcGlsZVJlc3VsdChjb21wTWV0YS50eXBlLm5hbWUsIGNvbXBpbGVSZXN1bHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzb2x2ZVN0eWxlc0NvbXBpbGVSZXN1bHQoc291cmNlVXJsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogU3R5bGVzQ29tcGlsZVJlc3VsdCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICB2YXIgcHJvbWlzZXMgPSByZXN1bHQuZGVwZW5kZW5jaWVzLm1hcCgoZGVwKSA9PiB0aGlzLl9sb2FkU3R5bGVzaGVldERlcChkZXApKTtcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuYWxsKHByb21pc2VzKVxuICAgICAgICAudGhlbigoY3NzVGV4dHMpID0+IHtcbiAgICAgICAgICB2YXIgbmVzdGVkQ29tcGlsZVJlc3VsdFByb21pc2VzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQuZGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGVwID0gcmVzdWx0LmRlcGVuZGVuY2llc1tpXTtcbiAgICAgICAgICAgIHZhciBjc3NUZXh0ID0gY3NzVGV4dHNbaV07XG4gICAgICAgICAgICB2YXIgbmVzdGVkQ29tcGlsZVJlc3VsdCA9XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVDb21waWxlci5jb21waWxlU3R5bGVzaGVldChkZXAuc291cmNlVXJsLCBjc3NUZXh0LCBkZXAuaXNTaGltbWVkKTtcbiAgICAgICAgICAgIG5lc3RlZENvbXBpbGVSZXN1bHRQcm9taXNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc29sdmVTdHlsZXNDb21waWxlUmVzdWx0KGRlcC5zb3VyY2VVcmwsIG5lc3RlZENvbXBpbGVSZXN1bHQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmFsbChuZXN0ZWRDb21waWxlUmVzdWx0UHJvbWlzZXMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigobmVzdGVkU3R5bGVzQXJyKSA9PiB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQuZGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGVwID0gcmVzdWx0LmRlcGVuZGVuY2llc1tpXTtcbiAgICAgICAgICAgIGRlcC52YWx1ZVBsYWNlaG9sZGVyLnJ1bnRpbWUgPSBuZXN0ZWRTdHlsZXNBcnJbaV07XG4gICAgICAgICAgICBkZXAudmFsdWVQbGFjZWhvbGRlci5uYW1lID0gYGltcG9ydGVkU3R5bGVzJHtpfWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChJU19EQVJUIHx8ICF0aGlzLl9nZW5Db25maWcudXNlSml0KSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJwcmV0U3RhdGVtZW50cyhyZXN1bHQuc3RhdGVtZW50cywgcmVzdWx0LnN0eWxlc1ZhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBJbnRlcnByZXRpdmVBcHBWaWV3SW5zdGFuY2VGYWN0b3J5KCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaml0U3RhdGVtZW50cyhgJHtzb3VyY2VVcmx9LmNzcy5qc2AsIHJlc3VsdC5zdGF0ZW1lbnRzLCByZXN1bHQuc3R5bGVzVmFyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZFN0eWxlc2hlZXREZXAoZGVwOiBTdHlsZXNDb21waWxlRGVwZW5kZW5jeSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgdmFyIGNhY2hlS2V5ID0gYCR7ZGVwLnNvdXJjZVVybH0ke2RlcC5pc1NoaW1tZWQgPyAnLnNoaW0nIDogJyd9YDtcbiAgICB2YXIgY3NzVGV4dFByb21pc2UgPSB0aGlzLl9zdHlsZUNhY2hlLmdldChjYWNoZUtleSk7XG4gICAgaWYgKGlzQmxhbmsoY3NzVGV4dFByb21pc2UpKSB7XG4gICAgICBjc3NUZXh0UHJvbWlzZSA9IHRoaXMuX3hoci5nZXQoZGVwLnNvdXJjZVVybCk7XG4gICAgICB0aGlzLl9zdHlsZUNhY2hlLnNldChjYWNoZUtleSwgY3NzVGV4dFByb21pc2UpO1xuICAgIH1cbiAgICByZXR1cm4gY3NzVGV4dFByb21pc2U7XG4gIH1cbn1cblxuY2xhc3MgQ29tcGlsZWRUZW1wbGF0ZSB7XG4gIHZpZXdGYWN0b3J5OiBGdW5jdGlvbiA9IG51bGw7XG4gIHByb3h5Vmlld0ZhY3Rvcnk6IEZ1bmN0aW9uO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb3h5Vmlld0ZhY3RvcnkgPSAodmlld1V0aWxzLCBjaGlsZEluamVjdG9yLCBjb250ZXh0RWwpID0+XG4gICAgICAgIHRoaXMudmlld0ZhY3Rvcnkodmlld1V0aWxzLCBjaGlsZEluamVjdG9yLCBjb250ZXh0RWwpO1xuICB9XG5cbiAgaW5pdCh2aWV3RmFjdG9yeTogRnVuY3Rpb24pIHsgdGhpcy52aWV3RmFjdG9yeSA9IHZpZXdGYWN0b3J5OyB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydENvbXBvbmVudChtZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpIHtcbiAgaWYgKCFtZXRhLmlzQ29tcG9uZW50KSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENvdWxkIG5vdCBjb21waWxlICcke21ldGEudHlwZS5uYW1lfScgYmVjYXVzZSBpdCBpcyBub3QgYSBjb21wb25lbnQuYCk7XG4gIH1cbn1cbiJdfQ==