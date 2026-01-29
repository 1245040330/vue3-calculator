
/**
 * @desc 数组转tree结构
 * @param {*} list  数组
 * @param {*} parentKey 上级idkey名
 * @param {*} idKey idkey名
 * @param {*} topId 顶级id
 * @returns
 */
export function arrayToTreeData(list, parentKey, idKey, topId) {
    let kData = {}; // 临时字典
    let lData = []; // 结果树结构

    // 先创建一个map：id => item
    list.forEach(item => {
        kData[item[idKey]] = {...item, children: []};
    });

    // 再挂载节点
    list.forEach(item => {
        const node = kData[item[idKey]];
        if (item[parentKey] == topId) {
            lData.push(node);
        } else {
            const parent = kData[item[parentKey]];
            if (parent) {
                parent.children.push(node);
            }
        }
    });

    return lData;
}


/**
 * @desc 树结构转 数组
 * @param {*} treeNodes
 * @returns
 */
export function treeToArray(treeNodes) {
    let result = [];

    //递归函数 traverse，用于处理单个节点
    function traverse(node) {
        const newNode = {...node};
        delete newNode.children;
        // 将没有子节点的新节点添加到结果数组中
        result.push(newNode);

        // 如果当前节点包含 children 属性（即有子节点）
        if (node.children) {
            node.children.forEach(traverse);
        }
    }

    treeNodes.forEach(traverse);

    return result;
}

export function treeMap(treeNodes, func) {
    if (func) {
        console.log("treeMap",treeNodes)
        let res = []

        //递归函数 traverse，用于处理单个节点
        function traverse(node) {
            let oldNode = {...node};
            // 如果当前节点包含 children 属性（即有子节点）
            if (oldNode.children) {
                for(let i=0;i<oldNode.children.length;i++) {
                    let node = oldNode.children[i];
                    traverse(node)
                }
                node.children = oldNode.children.map(func)
            }
        }
        for(let i=0;i<treeNodes.length;i++) {
            let node = treeNodes[i];
            traverse(node)
        }
        res = treeNodes.map(func);
        return res;
    } else {
        return []
    }
}