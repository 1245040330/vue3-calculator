import {cloneDeep} from 'lodash-es'
import api from '@/api'
import {basePermissions} from '@/settings'
import Path from 'path'

export async function getUserInfo() {
  const res = await api.getUser()
  return res.data
}

export async function getPermissions() {
  let asyncPermissions = []
  try {
    const res = await api.getRolePermissions()
    asyncPermissions = res?.data || []
  } catch (error) {
    console.error(error)
  }
  asyncPermissions =convertRouter(coverMenu(asyncPermissions)) ;
  console.log(asyncPermissions)
  return cloneDeep(basePermissions).concat(asyncPermissions)
}


function coverMenu(menuList) {
  let menu = menuList.map(element => {
    let children = undefined;
    if (element.children && element.children.length > 0) {
      children = coverMenu(element.children)
    }

    return {
      ...element,
      code: element.id,
      component: element.component,
      enable: element.status == 1 ? true : false,
      icon: element.icon,
      keepAlive: element.isCache == 1 ? true : false,
      layout: undefined,
      method: undefined,
      name: element.name,
      path: element.path,
      show: element.isVisible == 1 ? true : false,
      type: element.menuType == 0 ? 'MENU' : element.menuType == 1 ? 'MENU' : '权限',//MENU
      children: children,
    }
  })
  return menu
}


export function convertRouter(asyncRoutes, parentPath) {
  if (!parentPath) {
    parentPath = "/";
  }
  let menuList = asyncRoutes.map((route) => {
    if(route && route.path){
      route.initPath = route.path;
      route.path = Path.join(parentPath, route.path)
    }

    if (route.component) {
      if (route.component === 'Layout') {
        route.component=undefined;

      } else {
      }
    }
    if (route.children && route.children.length) route.children = convertRouter(route.children, Path.join(route.path, parentPath))
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
  menuList = menuList.filter(item => {
    return item.menuType == 0 || item.menuType == 1
  })

  return menuList
}
