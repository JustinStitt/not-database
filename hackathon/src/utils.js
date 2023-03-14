
export const inBounds = (x, y, width, height) => {
  if (x <= width && x >= 0 && y >= 0 && y <= height) return true;
  return false
}

const kGRAVITY = 1
export const applyGravity = (obj) => {
  if (obj.static == true) return;
  obj.vy += kGRAVITY;
}

export const distance = (obj1, obj2) => {
  return Math.sqrt((Math.pow(obj1.x - obj2.x, 2)) + (Math.pow(obj1.y - obj2.y, 2)));
}

export const collides = (obj1, obj2) => {
  const dist = distance(obj1, obj2);
  if (dist < obj1.r + obj2.r) {
    return true;
  }
  return false;
}
