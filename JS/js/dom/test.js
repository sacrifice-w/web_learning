
  var maxDepth = function(root) {
  let maxDepth = 0;
  if (!root) return maxDepth;

  const queue = [];
  queue.push(root);

  while(queue.length > 0) {
    let sizeOfLevel = queue.length;
    maxDepth ++;

    while(sizeOfLevel > 0) {
      const node = queue.shift();
      sizeOfLevel --;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return maxDepth;
};

root = [3,9,20,null,null,15,7];
console.log(maxDepth(root));