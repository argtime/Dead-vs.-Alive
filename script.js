let redBlock = document.getElementById('red');
let greenBlock = document.getElementById('green');
let greyBlock = document.getElementById('grey');
let container = document.querySelector('.container');
let isDragging = false;
let currentBlock = null;

redBlock.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentBlock = redBlock;
    document.body.style.cursor = 'grabbing';
});

greenBlock.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentBlock = greenBlock;
    document.body.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let containerRect = container.getBoundingClientRect();
        let greyRect = greyBlock.getBoundingClientRect();

        if (currentBlock === redBlock) {
            let newTop = e.clientY - containerRect.top - (redBlock.offsetHeight / 2);
            let maxTop = greyRect.top - containerRect.top;
            let minTop = greyRect.bottom - containerRect.top - redBlock.offsetHeight;

            if (newTop >= maxTop && newTop <= minTop) {
                redBlock.style.top = `${newTop}px`;
                greyBlock.style.top = `${newTop + redBlock.offsetHeight}px`;
            }
        } else if (currentBlock === greenBlock) {
            let newBottom = containerRect.bottom - e.clientY - (greenBlock.offsetHeight / 2);
            let maxBottom = containerRect.bottom - greyRect.bottom;
            let minBottom = greyRect.top - containerRect.top;

            if (newBottom >= maxBottom && newBottom <= minBottom) {
                greenBlock.style.bottom = `${newBottom}px`;
                greyBlock.style.top = `${containerRect.bottom - newBottom - greenBlock.offsetHeight}px`;
            }
        }
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentBlock = null;
    document.body.style.cursor = 'default';
});
