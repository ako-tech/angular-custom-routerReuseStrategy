import { ComponentRef } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class CustomRouterReuseStrategy extends RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const { mustBeStored } = route.data;

    if (mustBeStored) {
      return true;
    }

    return false;
  }
  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    if (handle === null) {
      return;
    }

    const key = this.generateKey(route);
    this.storedRoutes.set(key, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRoutes.has(this.generateKey(route));
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(this.generateKey(route)) ?? null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    const { doNotReuse, mustBeStored } = curr.data;

    if (doNotReuse || mustBeStored) {
      return false;
    }

    return curr.routeConfig === future.routeConfig;
  }

  deleteStoredRoute(url: string): void {
    const handle = this.storedRoutes.get(url);

    if (handle === undefined) {
      return;
    }

    (handle as { componentRef: ComponentRef<any> }).componentRef.destroy();
    this.storedRoutes.delete(url);
  }

  private generateKey(route: ActivatedRouteSnapshot): string {
    const fullPath = route.pathFromRoot
      .map((node) => node.url.join('/'))
      .filter(Boolean)
      .join('/');

    return '/' + fullPath;
  }
}
