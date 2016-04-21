import { CompileIdentifierMetadata, CompileTokenMetadata } from './compile_metadata';
import { AppView } from 'angular2/src/core/linker/view';
import { StaticNodeDebugInfo, DebugContext } from 'angular2/src/core/linker/debug_context';
import { ViewUtils, flattenNestedViewRenderNodes, interpolate, checkBinding } from 'angular2/src/core/linker/view_utils';
import { uninitialized, devModeEqual, SimpleChange, ValueUnwrapper, ChangeDetectorRef, ChangeDetectorState, ChangeDetectionStrategy } from 'angular2/src/core/change_detection/change_detection';
import { AppElement } from 'angular2/src/core/linker/element';
import { ElementRef } from 'angular2/src/core/linker/element_ref';
import { ViewContainerRef } from 'angular2/src/core/linker/view_container_ref';
import { Renderer, RenderComponentType } from 'angular2/src/core/render/api';
import { ViewEncapsulation } from 'angular2/src/core/metadata/view';
import { ViewType } from 'angular2/src/core/linker/view_type';
import { QueryList } from 'angular2/src/core/linker';
import { Injector } from 'angular2/src/core/di/injector';
import { TemplateRef, TemplateRef_ } from 'angular2/src/core/linker/template_ref';
import { MODULE_SUFFIX } from './util';
var APP_VIEW_MODULE_URL = 'asset:angular2/lib/src/core/linker/view' + MODULE_SUFFIX;
var VIEW_UTILS_MODULE_URL = 'asset:angular2/lib/src/core/linker/view_utils' + MODULE_SUFFIX;
var CD_MODULE_URL = 'asset:angular2/lib/src/core/change_detection/change_detection' + MODULE_SUFFIX;
// Reassign the imports to different variables so we can
// define static variables with the name of the import.
// (only needed for Dart).
var impViewUtils = ViewUtils;
var impAppView = AppView;
var impDebugContext = DebugContext;
var impAppElement = AppElement;
var impElementRef = ElementRef;
var impViewContainerRef = ViewContainerRef;
var impChangeDetectorRef = ChangeDetectorRef;
var impRenderComponentType = RenderComponentType;
var impQueryList = QueryList;
var impTemplateRef = TemplateRef;
var impTemplateRef_ = TemplateRef_;
var impValueUnwrapper = ValueUnwrapper;
var impInjector = Injector;
var impViewEncapsulation = ViewEncapsulation;
var impViewType = ViewType;
var impChangeDetectionStrategy = ChangeDetectionStrategy;
var impStaticNodeDebugInfo = StaticNodeDebugInfo;
var impRenderer = Renderer;
var impSimpleChange = SimpleChange;
var impUninitialized = uninitialized;
var impChangeDetectorState = ChangeDetectorState;
var impFlattenNestedViewRenderNodes = flattenNestedViewRenderNodes;
var impDevModeEqual = devModeEqual;
var impInterpolate = interpolate;
var impCheckBinding = checkBinding;
export class Identifiers {
}
Identifiers.ViewUtils = new CompileIdentifierMetadata({
    name: 'ViewUtils',
    moduleUrl: 'asset:angular2/lib/src/core/linker/view_utils' + MODULE_SUFFIX,
    runtime: impViewUtils
});
Identifiers.AppView = new CompileIdentifierMetadata({ name: 'AppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impAppView });
Identifiers.AppElement = new CompileIdentifierMetadata({
    name: 'AppElement',
    moduleUrl: 'asset:angular2/lib/src/core/linker/element' + MODULE_SUFFIX,
    runtime: impAppElement
});
Identifiers.ElementRef = new CompileIdentifierMetadata({
    name: 'ElementRef',
    moduleUrl: 'asset:angular2/lib/src/core/linker/element_ref' + MODULE_SUFFIX,
    runtime: impElementRef
});
Identifiers.ViewContainerRef = new CompileIdentifierMetadata({
    name: 'ViewContainerRef',
    moduleUrl: 'asset:angular2/lib/src/core/linker/view_container_ref' + MODULE_SUFFIX,
    runtime: impViewContainerRef
});
Identifiers.ChangeDetectorRef = new CompileIdentifierMetadata({
    name: 'ChangeDetectorRef',
    moduleUrl: 'asset:angular2/lib/src/core/change_detection/change_detector_ref' + MODULE_SUFFIX,
    runtime: impChangeDetectorRef
});
Identifiers.RenderComponentType = new CompileIdentifierMetadata({
    name: 'RenderComponentType',
    moduleUrl: 'asset:angular2/lib/src/core/render/api' + MODULE_SUFFIX,
    runtime: impRenderComponentType
});
Identifiers.QueryList = new CompileIdentifierMetadata({
    name: 'QueryList',
    moduleUrl: 'asset:angular2/lib/src/core/linker/query_list' + MODULE_SUFFIX,
    runtime: impQueryList
});
Identifiers.TemplateRef = new CompileIdentifierMetadata({
    name: 'TemplateRef',
    moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + MODULE_SUFFIX,
    runtime: impTemplateRef
});
Identifiers.TemplateRef_ = new CompileIdentifierMetadata({
    name: 'TemplateRef_',
    moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + MODULE_SUFFIX,
    runtime: impTemplateRef_
});
Identifiers.ValueUnwrapper = new CompileIdentifierMetadata({ name: 'ValueUnwrapper', moduleUrl: CD_MODULE_URL, runtime: impValueUnwrapper });
Identifiers.Injector = new CompileIdentifierMetadata({
    name: 'Injector',
    moduleUrl: `asset:angular2/lib/src/core/di/injector${MODULE_SUFFIX}`,
    runtime: impInjector
});
Identifiers.ViewEncapsulation = new CompileIdentifierMetadata({
    name: 'ViewEncapsulation',
    moduleUrl: 'asset:angular2/lib/src/core/metadata/view' + MODULE_SUFFIX,
    runtime: impViewEncapsulation
});
Identifiers.ViewType = new CompileIdentifierMetadata({
    name: 'ViewType',
    moduleUrl: `asset:angular2/lib/src/core/linker/view_type${MODULE_SUFFIX}`,
    runtime: impViewType
});
Identifiers.ChangeDetectionStrategy = new CompileIdentifierMetadata({
    name: 'ChangeDetectionStrategy',
    moduleUrl: CD_MODULE_URL,
    runtime: impChangeDetectionStrategy
});
Identifiers.StaticNodeDebugInfo = new CompileIdentifierMetadata({
    name: 'StaticNodeDebugInfo',
    moduleUrl: `asset:angular2/lib/src/core/linker/debug_context${MODULE_SUFFIX}`,
    runtime: impStaticNodeDebugInfo
});
Identifiers.DebugContext = new CompileIdentifierMetadata({
    name: 'DebugContext',
    moduleUrl: `asset:angular2/lib/src/core/linker/debug_context${MODULE_SUFFIX}`,
    runtime: impDebugContext
});
Identifiers.Renderer = new CompileIdentifierMetadata({
    name: 'Renderer',
    moduleUrl: 'asset:angular2/lib/src/core/render/api' + MODULE_SUFFIX,
    runtime: impRenderer
});
Identifiers.SimpleChange = new CompileIdentifierMetadata({ name: 'SimpleChange', moduleUrl: CD_MODULE_URL, runtime: impSimpleChange });
Identifiers.uninitialized = new CompileIdentifierMetadata({ name: 'uninitialized', moduleUrl: CD_MODULE_URL, runtime: impUninitialized });
Identifiers.ChangeDetectorState = new CompileIdentifierMetadata({ name: 'ChangeDetectorState', moduleUrl: CD_MODULE_URL, runtime: impChangeDetectorState });
Identifiers.checkBinding = new CompileIdentifierMetadata({ name: 'checkBinding', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCheckBinding });
Identifiers.flattenNestedViewRenderNodes = new CompileIdentifierMetadata({
    name: 'flattenNestedViewRenderNodes',
    moduleUrl: VIEW_UTILS_MODULE_URL,
    runtime: impFlattenNestedViewRenderNodes
});
Identifiers.devModeEqual = new CompileIdentifierMetadata({ name: 'devModeEqual', moduleUrl: CD_MODULE_URL, runtime: impDevModeEqual });
Identifiers.interpolate = new CompileIdentifierMetadata({ name: 'interpolate', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impInterpolate });
export function identifierToken(identifier) {
    return new CompileTokenMetadata({ identifier: identifier });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpZmllcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXZucmJSeThtLnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvaWRlbnRpZmllcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyx5QkFBeUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQjtPQUMzRSxFQUFDLE9BQU8sRUFBQyxNQUFNLCtCQUErQjtPQUM5QyxFQUFDLG1CQUFtQixFQUFFLFlBQVksRUFBQyxNQUFNLHdDQUF3QztPQUNqRixFQUNMLFNBQVMsRUFDVCw0QkFBNEIsRUFDNUIsV0FBVyxFQUNYLFlBQVksRUFDYixNQUFNLHFDQUFxQztPQUNyQyxFQUNMLGFBQWEsRUFDYixZQUFZLEVBQ1osWUFBWSxFQUNaLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN4QixNQUFNLHFEQUFxRDtPQUNyRCxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQztPQUNwRCxFQUFDLFVBQVUsRUFBQyxNQUFNLHNDQUFzQztPQUN4RCxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkNBQTZDO09BQ3JFLEVBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFrQixNQUFNLDhCQUE4QjtPQUNwRixFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDO09BQzFELEVBQUMsUUFBUSxFQUFDLE1BQU0sb0NBQW9DO09BQ3BELEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BQzNDLEVBQUMsUUFBUSxFQUFDLE1BQU0sK0JBQStCO09BQy9DLEVBQUMsV0FBVyxFQUFFLFlBQVksRUFBQyxNQUFNLHVDQUF1QztPQUN4RSxFQUFDLGFBQWEsRUFBQyxNQUFNLFFBQVE7QUFFcEMsSUFBSSxtQkFBbUIsR0FBRyx5Q0FBeUMsR0FBRyxhQUFhLENBQUM7QUFDcEYsSUFBSSxxQkFBcUIsR0FBRywrQ0FBK0MsR0FB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QUNqRix3Q0FBNEIsR0FBRyxJQUFJLHlCQUF5QixDQUFDO0lBQ2xFLElBQUksRUFBRSw4QkFBOEI7SUFDcEMsU0FBUyxFQUFFLHFCQUFxQjtJQUNoQyxPQUFPLEVBQUUsK0JBQStCO0NBQ3pDLENBQUMsQ0FBQztBQUNJLHdCQUFZLEdBQUcsSUFBSSx5QkFBeUIsQ0FDL0MsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUM7QUFDekUsdUJBQVcsR0FBRyxJQUFJLHlCQUF5QixDQUM5QyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUN0RjtBQUVELGdDQUFnQyxVQUFxQztJQUNuRSxNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0FBQzVELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsIENvbXBpbGVUb2tlbk1ldGFkYXRhfSBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtBcHBWaWV3fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlldyc7XG5pbXBvcnQge1N0YXRpY05vZGVEZWJ1Z0luZm8sIERlYnVnQ29udGV4dH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2RlYnVnX2NvbnRleHQnO1xuaW1wb3J0IHtcbiAgVmlld1V0aWxzLFxuICBmbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzLFxuICBpbnRlcnBvbGF0ZSxcbiAgY2hlY2tCaW5kaW5nXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3V0aWxzJztcbmltcG9ydCB7XG4gIHVuaW5pdGlhbGl6ZWQsXG4gIGRldk1vZGVFcXVhbCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWYWx1ZVVud3JhcHBlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdG9yU3RhdGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50JztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7Vmlld0NvbnRhaW5lclJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZic7XG5pbXBvcnQge1JlbmRlcmVyLCBSZW5kZXJDb21wb25lbnRUeXBlLCBSZW5kZXJEZWJ1Z0luZm99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge1ZpZXdUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld190eXBlJztcbmltcG9ydCB7UXVlcnlMaXN0fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXInO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtUZW1wbGF0ZVJlZiwgVGVtcGxhdGVSZWZffSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7TU9EVUxFX1NVRkZJWH0gZnJvbSAnLi91dGlsJztcblxudmFyIEFQUF9WSUVXX01PRFVMRV9VUkwgPSAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci92aWV3JyArIE1PRFVMRV9TVUZGSVg7XG52YXIgVklFV19VVElMU19NT0RVTEVfVVJMID0gJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdmlld191dGlscycgKyBNT0RVTEVfU1VGRklYO1xudmFyIENEX01PRFVMRV9VUkwgPSAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbicgKyBNT0RVTEVfU1VGRklYO1xuXG4vLyBSZWFzc2lnbiB0aGUgaW1wb3J0cyB0byBkaWZmZXJlbnQgdmFyaWFibGVzIHNvIHdlIGNhblxuLy8gZGVmaW5lIHN0YXRpYyB2YXJpYWJsZXMgd2l0aCB0aGUgbmFtZSBvZiB0aGUgaW1wb3J0LlxuLy8gKG9ubHkgbmVlZGVkIGZvciBEYXJ0KS5cbnZhciBpbXBWaWV3VXRpbHMgPSBWaWV3VXRpbHM7XG52YXIgaW1wQXBwVmlldyA9IEFwcFZpZXc7XG52YXIgaW1wRGVidWdDb250ZXh0ID0gRGVidWdDb250ZXh0O1xudmFyIGltcEFwcEVsZW1lbnQgPSBBcHBFbGVtZW50O1xudmFyIGltcEVsZW1lbnRSZWYgPSBFbGVtZW50UmVmO1xudmFyIGltcFZpZXdDb250YWluZXJSZWYgPSBWaWV3Q29udGFpbmVyUmVmO1xudmFyIGltcENoYW5nZURldGVjdG9yUmVmID0gQ2hhbmdlRGV0ZWN0b3JSZWY7XG52YXIgaW1wUmVuZGVyQ29tcG9uZW50VHlwZSA9IFJlbmRlckNvbXBvbmVudFR5cGU7XG52YXIgaW1wUXVlcnlMaXN0ID0gUXVlcnlMaXN0O1xudmFyIGltcFRlbXBsYXRlUmVmID0gVGVtcGxhdGVSZWY7XG52YXIgaW1wVGVtcGxhdGVSZWZfID0gVGVtcGxhdGVSZWZfO1xudmFyIGltcFZhbHVlVW53cmFwcGVyID0gVmFsdWVVbndyYXBwZXI7XG52YXIgaW1wSW5qZWN0b3IgPSBJbmplY3RvcjtcbnZhciBpbXBWaWV3RW5jYXBzdWxhdGlvbiA9IFZpZXdFbmNhcHN1bGF0aW9uO1xudmFyIGltcFZpZXdUeXBlID0gVmlld1R5cGU7XG52YXIgaW1wQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgPSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTtcbnZhciBpbXBTdGF0aWNOb2RlRGVidWdJbmZvID0gU3RhdGljTm9kZURlYnVnSW5mbztcbnZhciBpbXBSZW5kZXJlciA9IFJlbmRlcmVyO1xudmFyIGltcFNpbXBsZUNoYW5nZSA9IFNpbXBsZUNoYW5nZTtcbnZhciBpbXBVbmluaXRpYWxpemVkID0gdW5pbml0aWFsaXplZDtcbnZhciBpbXBDaGFuZ2VEZXRlY3RvclN0YXRlID0gQ2hhbmdlRGV0ZWN0b3JTdGF0ZTtcbnZhciBpbXBGbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzID0gZmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2RlcztcbnZhciBpbXBEZXZNb2RlRXF1YWwgPSBkZXZNb2RlRXF1YWw7XG52YXIgaW1wSW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZTtcbnZhciBpbXBDaGVja0JpbmRpbmcgPSBjaGVja0JpbmRpbmc7XG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWVycyB7XG4gIHN0YXRpYyBWaWV3VXRpbHMgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1ZpZXdVdGlscycsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci92aWV3X3V0aWxzJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVmlld1V0aWxzXG4gIH0pO1xuICBzdGF0aWMgQXBwVmlldyA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdBcHBWaWV3JywgbW9kdWxlVXJsOiBBUFBfVklFV19NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBBcHBWaWV3fSk7XG4gIHN0YXRpYyBBcHBFbGVtZW50ID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdBcHBFbGVtZW50JyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnQnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBBcHBFbGVtZW50XG4gIH0pO1xuICBzdGF0aWMgRWxlbWVudFJlZiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnRWxlbWVudFJlZicsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X3JlZicgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcEVsZW1lbnRSZWZcbiAgfSk7XG4gIHN0YXRpYyBWaWV3Q29udGFpbmVyUmVmID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdWaWV3Q29udGFpbmVyUmVmJyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZicgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcFZpZXdDb250YWluZXJSZWZcbiAgfSk7XG4gIHN0YXRpYyBDaGFuZ2VEZXRlY3RvclJlZiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnQ2hhbmdlRGV0ZWN0b3JSZWYnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBDaGFuZ2VEZXRlY3RvclJlZlxuICB9KTtcbiAgc3RhdGljIFJlbmRlckNvbXBvbmVudFR5cGUgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1JlbmRlckNvbXBvbmVudFR5cGUnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9yZW5kZXIvYXBpJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wUmVuZGVyQ29tcG9uZW50VHlwZVxuICB9KTtcbiAgc3RhdGljIFF1ZXJ5TGlzdCA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnUXVlcnlMaXN0JyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL3F1ZXJ5X2xpc3QnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBRdWVyeUxpc3RcbiAgfSk7XG4gIHN0YXRpYyBUZW1wbGF0ZVJlZiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnVGVtcGxhdGVSZWYnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdGVtcGxhdGVfcmVmJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVGVtcGxhdGVSZWZcbiAgfSk7XG4gIHN0YXRpYyBUZW1wbGF0ZVJlZl8gPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1RlbXBsYXRlUmVmXycsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci90ZW1wbGF0ZV9yZWYnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBUZW1wbGF0ZVJlZl9cbiAgfSk7XG4gIHN0YXRpYyBWYWx1ZVVud3JhcHBlciA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdWYWx1ZVVud3JhcHBlcicsIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wVmFsdWVVbndyYXBwZXJ9KTtcbiAgc3RhdGljIEluamVjdG9yID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdJbmplY3RvcicsXG4gICAgbW9kdWxlVXJsOiBgYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2RpL2luamVjdG9yJHtNT0RVTEVfU1VGRklYfWAsXG4gICAgcnVudGltZTogaW1wSW5qZWN0b3JcbiAgfSk7XG4gIHN0YXRpYyBWaWV3RW5jYXBzdWxhdGlvbiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnVmlld0VuY2Fwc3VsYXRpb24nLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVmlld0VuY2Fwc3VsYXRpb25cbiAgfSk7XG4gIHN0YXRpYyBWaWV3VHlwZSA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnVmlld1R5cGUnLFxuICAgIG1vZHVsZVVybDogYGFzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdmlld190eXBlJHtNT0RVTEVfU1VGRklYfWAsXG4gICAgcnVudGltZTogaW1wVmlld1R5cGVcbiAgfSk7XG4gIHN0YXRpYyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3knLFxuICAgIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCxcbiAgICBydW50aW1lOiBpbXBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxuICB9KTtcbiAgc3RhdGljIFN0YXRpY05vZGVEZWJ1Z0luZm8gPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1N0YXRpY05vZGVEZWJ1Z0luZm8nLFxuICAgIG1vZHVsZVVybDogYGFzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvZGVidWdfY29udGV4dCR7TU9EVUxFX1NVRkZJWH1gLFxuICAgIHJ1bnRpbWU6IGltcFN0YXRpY05vZGVEZWJ1Z0luZm9cbiAgfSk7XG4gIHN0YXRpYyBEZWJ1Z0NvbnRleHQgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ0RlYnVnQ29udGV4dCcsXG4gICAgbW9kdWxlVXJsOiBgYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci9kZWJ1Z19jb250ZXh0JHtNT0RVTEVfU1VGRklYfWAsXG4gICAgcnVudGltZTogaW1wRGVidWdDb250ZXh0XG4gIH0pO1xuICBzdGF0aWMgUmVuZGVyZXIgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1JlbmRlcmVyJyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvcmVuZGVyL2FwaScgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcFJlbmRlcmVyXG4gIH0pO1xuICBzdGF0aWMgU2ltcGxlQ2hhbmdlID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ1NpbXBsZUNoYW5nZScsIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wU2ltcGxlQ2hhbmdlfSk7XG4gIHN0YXRpYyB1bmluaXRpYWxpemVkID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ3VuaW5pdGlhbGl6ZWQnLCBtb2R1bGVVcmw6IENEX01PRFVMRV9VUkwsIHJ1bnRpbWU6IGltcFVuaW5pdGlhbGl6ZWR9KTtcbiAgc3RhdGljIENoYW5nZURldGVjdG9yU3RhdGUgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnQ2hhbmdlRGV0ZWN0b3JTdGF0ZScsIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wQ2hhbmdlRGV0ZWN0b3JTdGF0ZX0pO1xuICBzdGF0aWMgY2hlY2tCaW5kaW5nID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ2NoZWNrQmluZGluZycsIG1vZHVsZVVybDogVklFV19VVElMU19NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBDaGVja0JpbmRpbmd9KTtcbiAgc3RhdGljIGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ2ZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMnLFxuICAgIG1vZHVsZVVybDogVklFV19VVElMU19NT0RVTEVfVVJMLFxuICAgIHJ1bnRpbWU6IGltcEZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXNcbiAgfSk7XG4gIHN0YXRpYyBkZXZNb2RlRXF1YWwgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnZGV2TW9kZUVxdWFsJywgbW9kdWxlVXJsOiBDRF9NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBEZXZNb2RlRXF1YWx9KTtcbiAgc3RhdGljIGludGVycG9sYXRlID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ2ludGVycG9sYXRlJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IGltcEludGVycG9sYXRlfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmaWVyVG9rZW4oaWRlbnRpZmllcjogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSk6IENvbXBpbGVUb2tlbk1ldGFkYXRhIHtcbiAgcmV0dXJuIG5ldyBDb21waWxlVG9rZW5NZXRhZGF0YSh7aWRlbnRpZmllcjogaWRlbnRpZmllcn0pO1xufVxuIl19