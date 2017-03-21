const showAlert = msg => alert(msg);

const makeSquare = size => {
    const ele = document.createElement('div');
    ele.className = 'square';
    ele.style.height = size + 'px';
    ele.style.width = size + 'px';
    return ele;
};

const quadSplit = function() {
    console.log(this);
    const origSize = this.clientHeight;
    const size = Math.floor(this.clientHeight / 2);
    for (let i = 0; i < 4; i += 1) {
          let square = makeSquare(size);
          square.style.transform = `translate(${origSize}px, ${-5}px)`;
          square.onclick = quadSplit.bind(square);
          this.appendChild(square);
        }
    this.onclick = null;
};

const init = () => {
    const sqr = makeSquare(200);
    sqr.onclick = quadSplit.bind(sqr);
    document.body.appendChild(sqr);
};

init();

/*
 var boxes = document.getElementsByClassName('square');
 //console.log(boxes);
[].forEach.call(boxes, function(item) {
    item.style.height = '50px';
    item.style.width = '50px';
    item.innerHTML = 'new';
});
*/
