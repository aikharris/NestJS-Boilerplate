// global util functions

if(!Array.prototype.removeLast) {
  Array.prototype.removeLast = function () {
    this.pop();
    return this
  }
}