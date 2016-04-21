'use strict';"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var core_1 = require('angular2/core');
var worker_render_1 = require('angular2/src/platform/worker_render');
var worker_render_common_1 = require('angular2/src/platform/worker_render_common');
var worker_render_common_2 = require('angular2/src/platform/worker_render_common');
exports.WORKER_SCRIPT = worker_render_common_2.WORKER_SCRIPT;
exports.WORKER_RENDER_PLATFORM = worker_render_common_2.WORKER_RENDER_PLATFORM;
exports.initializeGenericWorkerRenderer = worker_render_common_2.initializeGenericWorkerRenderer;
exports.WORKER_RENDER_APPLICATION_COMMON = worker_render_common_2.WORKER_RENDER_APPLICATION_COMMON;
var worker_render_2 = require('angular2/src/platform/worker_render');
exports.WORKER_RENDER_APPLICATION = worker_render_2.WORKER_RENDER_APPLICATION;
exports.WebWorkerInstance = worker_render_2.WebWorkerInstance;
var client_message_broker_1 = require('../src/web_workers/shared/client_message_broker');
exports.ClientMessageBroker = client_message_broker_1.ClientMessageBroker;
exports.ClientMessageBrokerFactory = client_message_broker_1.ClientMessageBrokerFactory;
exports.FnArg = client_message_broker_1.FnArg;
exports.UiArguments = client_message_broker_1.UiArguments;
var service_message_broker_1 = require('../src/web_workers/shared/service_message_broker');
exports.ReceivedMessage = service_message_broker_1.ReceivedMessage;
exports.ServiceMessageBroker = service_message_broker_1.ServiceMessageBroker;
exports.ServiceMessageBrokerFactory = service_message_broker_1.ServiceMessageBrokerFactory;
var serializer_1 = require('../src/web_workers/shared/serializer');
exports.PRIMITIVE = serializer_1.PRIMITIVE;
__export(require('../src/web_workers/shared/message_bus'));
/**
 * @deprecated Use WORKER_RENDER_APPLICATION
 */
exports.WORKER_RENDER_APP = worker_render_1.WORKER_RENDER_APPLICATION;
var router_providers_1 = require('angular2/src/web_workers/ui/router_providers');
exports.WORKER_RENDER_ROUTER = router_providers_1.WORKER_RENDER_ROUTER;
function workerRenderPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(worker_render_common_1.WORKER_RENDER_PLATFORM));
    }
    return core_1.assertPlatform(worker_render_common_1.WORKER_RENDER_PLATFORM_MARKER);
}
exports.workerRenderPlatform = workerRenderPlatform;
function bootstrapRender(workerScriptUri, customProviders) {
    var pf = core_1.ReflectiveInjector.resolveAndCreate(worker_render_common_1.WORKER_RENDER_PLATFORM);
    var app = core_1.ReflectiveInjector.resolveAndCreate([
        worker_render_1.WORKER_RENDER_APPLICATION,
        new core_1.Provider(worker_render_common_1.WORKER_SCRIPT, { useValue: workerScriptUri }),
        lang_1.isPresent(customProviders) ? customProviders : []
    ], workerRenderPlatform().injector);
    // Return a promise so that we keep the same semantics as Dart,
    // and we might want to wait for the app side to come up
    // in the future...
    return async_1.PromiseWrapper.resolve(app.get(core_1.ApplicationRef));
}
exports.bootstrapRender = bootstrapRender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUXJPcVNETDAudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFCQUFpQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzVELHNCQUE2QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3pELHFCQVFPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLDhCQUF3QyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQzlFLHFDQUlPLDRDQUE0QyxDQUFDLENBQUE7QUFFcEQscUNBS08sNENBQTRDLENBQUM7QUFKbEQsNkRBQWE7QUFDYiwrRUFBc0I7QUFDdEIsaUdBQStCO0FBQy9CLG1HQUNrRDtBQUNwRCw4QkFBMkQscUNBQXFDLENBQUM7QUFBekYsOEVBQXlCO0FBQUUsOERBQThEO0FBQ2pHLHNDQUtPLGlEQUFpRCxDQUFDO0FBSnZELDBFQUFtQjtBQUNuQix3RkFBMEI7QUFDMUIsOENBQUs7QUFDTCwwREFDdUQ7QUFDekQsdUNBSU8sa0RBQWtELENBQUM7QUFIeEQsbUVBQWU7QUFDZiw2RUFBb0I7QUFDcEIsMkZBQ3dEO0FBQzFELDJCQUF3QixzQ0FBc0MsQ0FBQztBQUF2RCwyQ0FBdUQ7QUFDL0QsaUJBQWMsdUNBQXVDLENBQUMsRUFBQTtBQUV0RDs7R0FFRztBQUNVLHlCQUFpQixHQUFHLHlDQUF5QixDQUFDO0FBQzNELGlDQUFtQyw4Q0FBOEMsQ0FBQztBQUExRSx1RUFBMEU7QUFFbEY7SUFDRSxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsa0JBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLHFCQUFjLENBQUMseUJBQWtCLENBQUMsZ0JBQWdCLENBQUMsNkNBQXNCLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFDRCxNQUFNLENBQUMscUJBQWMsQ0FBQyxvREFBNkIsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFMZSw0QkFBb0IsdUJBS25DLENBQUE7QUFFRCx5QkFDSSxlQUF1QixFQUN2QixlQUF3RDtJQUMxRCxJQUFJLEVBQUUsR0FBRyx5QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyw2Q0FBc0IsQ0FBQyxDQUFDO0lBQ3JFLElBQUksR0FBRyxHQUFHLHlCQUFrQixDQUFDLGdCQUFnQixDQUN6QztRQUNFLHlDQUF5QjtRQUN6QixJQUFJLGVBQVEsQ0FBQyxvQ0FBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDO1FBQ3hELGdCQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsZUFBZSxHQUFHLEVBQUU7S0FDbEQsRUFDRCxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLCtEQUErRDtJQUMvRCx3REFBd0Q7SUFDeEQsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFjLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFmZSx1QkFBZSxrQkFlOUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgUGxhdGZvcm1SZWYsXG4gIFJlZmxlY3RpdmVJbmplY3RvcixcbiAgUHJvdmlkZXIsXG4gIGdldFBsYXRmb3JtLFxuICBjcmVhdGVQbGF0Zm9ybSxcbiAgYXNzZXJ0UGxhdGZvcm1cbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1dPUktFUl9SRU5ERVJfQVBQTElDQVRJT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyJztcbmltcG9ydCB7XG4gIFdPUktFUl9TQ1JJUFQsXG4gIFdPUktFUl9SRU5ERVJfUExBVEZPUk0sXG4gIFdPUktFUl9SRU5ERVJfUExBVEZPUk1fTUFSS0VSXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyX2NvbW1vbic7XG5cbmV4cG9ydCB7XG4gIFdPUktFUl9TQ1JJUFQsXG4gIFdPUktFUl9SRU5ERVJfUExBVEZPUk0sXG4gIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIsXG4gIFdPUktFUl9SRU5ERVJfQVBQTElDQVRJT05fQ09NTU9OXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyX2NvbW1vbic7XG5leHBvcnQge1dPUktFUl9SRU5ERVJfQVBQTElDQVRJT04sIFdlYldvcmtlckluc3RhbmNlfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcic7XG5leHBvcnQge1xuICBDbGllbnRNZXNzYWdlQnJva2VyLFxuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgRm5BcmcsXG4gIFVpQXJndW1lbnRzXG59IGZyb20gJy4uL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmV4cG9ydCB7XG4gIFJlY2VpdmVkTWVzc2FnZSxcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXIsXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeVxufSBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuZXhwb3J0IHtQUklNSVRJVkV9IGZyb20gJy4uL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgV09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTlxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9BUFAgPSBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OO1xuZXhwb3J0IHtXT1JLRVJfUkVOREVSX1JPVVRFUn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3JvdXRlcl9wcm92aWRlcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gd29ya2VyUmVuZGVyUGxhdGZvcm0oKTogUGxhdGZvcm1SZWYge1xuICBpZiAoaXNCbGFuayhnZXRQbGF0Zm9ybSgpKSkge1xuICAgIGNyZWF0ZVBsYXRmb3JtKFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFdPUktFUl9SRU5ERVJfUExBVEZPUk0pKTtcbiAgfVxuICByZXR1cm4gYXNzZXJ0UGxhdGZvcm0oV09SS0VSX1JFTkRFUl9QTEFURk9STV9NQVJLRVIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwUmVuZGVyKFxuICAgIHdvcmtlclNjcmlwdFVyaTogc3RyaW5nLFxuICAgIGN1c3RvbVByb3ZpZGVycz86IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+KTogUHJvbWlzZTxBcHBsaWNhdGlvblJlZj4ge1xuICB2YXIgcGYgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShXT1JLRVJfUkVOREVSX1BMQVRGT1JNKTtcbiAgdmFyIGFwcCA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFxuICAgICAgW1xuICAgICAgICBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OLFxuICAgICAgICBuZXcgUHJvdmlkZXIoV09SS0VSX1NDUklQVCwge3VzZVZhbHVlOiB3b3JrZXJTY3JpcHRVcml9KSxcbiAgICAgICAgaXNQcmVzZW50KGN1c3RvbVByb3ZpZGVycykgPyBjdXN0b21Qcm92aWRlcnMgOiBbXVxuICAgICAgXSxcbiAgICAgIHdvcmtlclJlbmRlclBsYXRmb3JtKCkuaW5qZWN0b3IpO1xuICAvLyBSZXR1cm4gYSBwcm9taXNlIHNvIHRoYXQgd2Uga2VlcCB0aGUgc2FtZSBzZW1hbnRpY3MgYXMgRGFydCxcbiAgLy8gYW5kIHdlIG1pZ2h0IHdhbnQgdG8gd2FpdCBmb3IgdGhlIGFwcCBzaWRlIHRvIGNvbWUgdXBcbiAgLy8gaW4gdGhlIGZ1dHVyZS4uLlxuICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShhcHAuZ2V0KEFwcGxpY2F0aW9uUmVmKSk7XG59XG4iXX0=