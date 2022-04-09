export default function menuConverter(menuList){
  const [map, treeData] = [{}, []];

  for (let i = 0; i < menuList.length; i++) {
    map[menuList[i].id] = i;
    menuList[i].children = [];
  }

  for (let i = 0; i < menuList.length; i++) {
    const node = menuList[i];
    if(node.parent && menuList[map[node.parent]]){
      menuList[map[node.parent]].children.push(node);
    }else{
      treeData.push(node);
    }
  }

  return treeData;
}