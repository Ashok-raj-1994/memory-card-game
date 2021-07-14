
//Gllobal declarations

let selectArray = []; foundImages = 0, numberOfAttempts = 0, smileyArray = [];

const parent = document.querySelector('.parent');



App = {

    init: function () {

        this.eventHandlers();
        this.shufflePrototype();
        this.createBlockArray();
        this.generateBlockDOM();

    },

    eventHandlers: function () {
        parent.addEventListener('click', this.imageClickEvent.bind(this));
        document.getElementById('reset-button').addEventListener('click', this.resetGame.bind(this));
    },

    resetGame: function () {
        selectArray = []; smileyArray = [];
        foundImages = 0; numberOfAttempts = 0;
        parent.innerHTML = "";
        this.createBlockArray();
        this.generateBlockDOM();
        this.setNumberOfAttempts();
    },

    imageClickEvent: function (e) {

        let element = e.target;
        if (!element.className.includes('image'))
            return;

        numberOfAttempts++;
        this.setNumberOfAttempts();
        element.classList.remove('rotated');
        element.classList.remove('reset');
        element.classList.add('rotated');
        element.src = element.id;

        selectArray.push({ image: element.id, index: element.getAttribute("index") });
        this.checkTurnCompleted();

    },


    checkTurnCompleted: function () {

        if (selectArray.length === 2) {
            const [first, second] = selectArray;
            if (first && second) {
                if (first.image !== second.image) {
                    this.resetBlocks(first.index, second.index);
                }
                if (first && second && first.image === second.image) {
                    foundImages = foundImages + 2;
                    if (foundImages === 16) {
                        this.resetGame();
                        alert("You won")
                    }
                }
                selectArray = [];
            }

        }

    },

    createBlockArray: function () {

        for (let i = 1; i < 9; i++) {
            const hide = `assets/hide.jpg`;
            const realImage = `assets/image-${i}.jpg`;

            smileyArray.push({ img: hide, realImage });
            smileyArray.push({ img: hide, realImage });
        }

        smileyArray.shuffle();

    },

    generateBlockDOM: function () {

        smileyArray.forEach((element, index) => {
            const child = document.createElement('div');
            child.classList.add('child');
            child.innerHTML = `<img class='image' index="${index}" id="${element.realImage}" src="${element.img}" />`;
            parent.appendChild(child);
        });

    },


    resetBlocks: function (...selectedImageIndex) {

        let allImages = document.querySelectorAll('img');

        setTimeout(() => {
            selectedImageIndex.forEach(index => {
                index = Number(index);
                allImages[index].src = `assets/hide.jpg`;
                allImages[index].classList.remove('rotated');
                allImages[index].classList.add('reset');
            });
        }, 1200);

    },

    shufflePrototype: function () {

        Array.prototype.shuffle = function () {
            let m = this.length, i;
            while (m) {
                i = (Math.random() * m--) >>> 0;
                [this[m], this[i]] = [this[i], this[m]]
            }
            return this;
        }

    },

    setNumberOfAttempts: function () {
        document.getElementById("number-of-attempts").innerHTML = numberOfAttempts;
    }


}



App.init();






