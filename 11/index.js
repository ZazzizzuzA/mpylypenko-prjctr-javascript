"use strict";

function ManagerHTMLElements(resultAreaId, codeAreaId) {
  return {
    resultAreaId,
    codeAreaId,
    getResultTextarea() {
      return document.getElementById(this.resultAreaId);
    },

    clearResultArea(ids) {
      this.getResultTextarea().value = '';
      if (ids) {
        ids.forEach(id => this.getCustomElemById(id).value = '');
      }
      console.clear();
    },

    addResultInTextarea(result, divider = '; ') {
      const resultArea = this.getResultTextarea();
      let areaValue = resultArea.value;
      if (!areaValue) {
        resultArea.value += result;
        return;
      }
      resultArea.value += divider + result;
    },

    getCodeArea() {
      return document.getElementById(this.codeAreaId);
    },

    showCode(funcToShow) {
      const codeArea = this.getCodeArea();
      codeArea.value = funcToShow.toString().replace(/function HW[0-9]{1,2}(First|Second|Third|Fourth|Fifth)\(\) \{/, '').replace(/\}$/, '').replace(/(\r)/g, '');
    },

    getCustomElemById(id) {
      return document.getElementById(id);
    },

    addResultInCustomTextarea(id, result, divider = '; ') {
      const resultArea = this.getCustomElemById(id);
      let areaValue = resultArea.value;
      if (!areaValue) {
        resultArea.value += result;
        return;
      }
      resultArea.value += divider + result;
    },

    showCodeInCustomElem(id, funcToShow) {
      const codeArea = this.getCustomElemById(id);
      codeArea.value = funcToShow.toString().replace(/function.[^{}]*\{/, '').replace(/\}$/, '').replace(/(\r)/g, '');
    },

  }
}

function main() {
  let manager = ManagerHTMLElements('', 'area-code-1');
  class Sex {
    #allPosibleTypes = ['male', 'female', 'donut', 'jurba']
    constructor(type) {
      this.type = type;
      console.log(`Setting sex: ${this.type}.`)
      alert(`Setting sex: ${this.type}.`);
    }

    get sexType() {
      return this.type;
    }

    getAllPossibleSexTypes() {
      return this.#allPosibleTypes;
    }


  }

  class Race extends Sex {
    constructor(title, abilities, mainParameter) {
      super('male');
      this.title = title;
      this.abilities = abilities;
      this.mainParameter = mainParameter;
      console.log(`Setting race: ${this.title}.`)
      alert(`Setting race: ${this.title}.`);
    }

    get raceTitle() {
      return this.title;
    }

    set raceTitle(val) {
      this.title = val;
    }

    get raceAbilities() {
      console.log(`The ability list of the race ${this.raceTitle}: ${this.abilities.join(', ')}`);
      alert(`The ability list of the race ${this.raceTitle}: ${this.abilities.join(', ')}`);
      return this.abilities;
    }

    get raceMainParameter() {
      return this.mainParameter;
    }
  }

  class Humanoid extends Race {
    constructor(raceTitle, abilities, mainParameter) {
      super(raceTitle, abilities, mainParameter);
      this.amountHands = 2;
      this.amountLegs = 2;
      this.amountHeads = 1;
      this.currentAmountHands = this.amountHands;
      this.currentAmountLegs = this.amountLegs;
      this.currentAmountHeads = this.amountHeads;
      console.log(`Setting type of creature a humanoid, race ${raceTitle}. With ${this.amountHands} hands, ${this.amountLegs} legs, ${this.amountHeads} head.`);
      alert(`Setting type of creature a humanoid, race ${raceTitle}. With ${this.amountHands} hands, ${this.amountLegs} legs, ${this.amountHeads} head.`);
    }

    get humanoidAbilities() {
      return this.raceAbilities;
    }

    howMuchHandsExists() {
      return this.currentAmountHands;
    }
  }

  class Elf extends Humanoid {
    constructor(name, age) {
      super('elf', [
        'long life',
        'fast',
        'good with bows',
        'powerful magic'
      ], 'agility');
      this.name = name;
      this.age = age;
      this.HP = 79;
      this.currentHP = this.HP;
      console.log(`Created an Elf with name ${this.name}; with main parameter ${this.raceMainParameter}`);
      alert(`Created an Elf with name ${this.name}; with main parameter ${this.raceMainParameter}`);
    }

    get language() {
      return 'elfish';
    }

    sayOnElfish(text) {
      if (!text) return;

      let words = text.split(' ').map(el => {
        let symbol = el[el.length - 1];
        if (symbol.search(/\.|\,|\;|\:|\`|\"|\'/) !== -1) {
          el = el.replace(symbol, '');
        }

        return (el.split('').reverse().join('') + symbol).toLowerCase();
      });

      let translated = words.join(' ');

      console.log(`Elf, who named ${this.name}, said: "${translated}"`);
      alert(`Elf, who named ${this.name}, said: "${translated}"`);
    }

    get #getAge() {
      return this.age
    }

    currentAge() {
      console.log(`Elf, who named ${this.name}, is ${this.age} years old`);
      alert(`Elf, who named ${this.name}, is ${this.age} years old`);
      return this.#getAge;
    }

    takeBow(bow) {
      let amountOfHands = this.howMuchHandsExists();
      if (amountOfHands < 2) {
        console.log(`Elf ${this.name} can't use a bow. He has not enough hands. Current amount is ${amountOfHands}`);
        alert(`Elf ${this.name} can't use a bow. He has not enough hands. Current amount is ${amountOfHands}`);
      }
      this.mainWeapon = bow;
      console.log(`Elf ${this.name} took a bow. It can do these tricks:`, this.mainWeapon.listOfTricks.join(', '));
      alert(`Elf ${this.name} took a bow. It can do these tricks: ${this.mainWeapon.listOfTricks.join(', ')}`);
    }

    takeADamage(value) {
      this.currentHP -= value;
      console.log(`Elf ${this.name} took a damage on ${value} HP. Current HP is ${this.currentHP}`);
      alert(`Elf ${this.name} took a damage on ${value} HP. Current HP is ${this.currentHP}`);
      if (this.currentHP <= 0) {
        console.log(`%cElf ${this.name} is dead`, 'background-color: #ff9b9b; color: blueviolet');
        alert(`Elf ${this.name} is dead`);
        return 'dead';
      }
      return 'alive';
    }

    useRandomAttack() {
      if (!this.mainWeapon) {
        console.log(`Elf doesn't have a weapon. He can't hit you. Give him a weapon.`);
        alert(`Elf doesn't have a weapon. He can't hit you. Give him a weapon.`);
        return;
      }
      let listOfAttacks = this.mainWeapon.listOfTricks;
      let nameAttack = Math.random() >= 0.5 ? listOfAttacks[1] : listOfAttacks[0];
      this.mainWeapon[nameAttack]();
      
      let currentSustaneOfWeapon = this.mainWeapon.weaponCurrentSustane;
      console.log(`Elf ${this.name} hit someone and sustane of weapon was decreased. Current sustane is ${currentSustaneOfWeapon}`);
      alert(`Elf ${this.name} hit someone and sustane of weapon was decreased. Current sustane is ${currentSustaneOfWeapon}`);
      
      if (currentSustaneOfWeapon <= 0) {
        console.log(`Elf ${this.name} has a broken ${this.mainWeapon.weaponName}. Current sustane of weapon is ${currentSustaneOfWeapon}.`);
        alert(`Elf ${this.name} has a broken ${this.mainWeapon.weaponName} and can't hit someone. Current sustane of weapon is ${currentSustaneOfWeapon}.`);
        return;
      }
    }
  }

  class Weapon {
    constructor(name, tricks) {
      this.weaponName = name;
      this.tricks = tricks;
      this.sustane = 10;
      this.currentSustane = this.sustane;
    }

    get weaponPower() {
      return this.power;
    }

    get listOfTricks() {
      return this.tricks;
    }

    get amountOfTricks() {
      return this.tricks.length;
    }

    get weaponCurrentSustane() {
      return this.currentSustane;
    }

    changeSustane(value) {
      this.currentSustane += value;
    }
  }

  class Bow extends Weapon {
    constructor() {
      super('bow', ['#standartAttack', '#doubleAttack']);
      this.power = 5;
      this.mainParameter = 'agility';
    }

    standartAttack() {
      console.log(`POW!`);
      alert(`POW!`);
      this.changeSustane(-2);
      return 'POW!';
    }

    doubleAttack() {
      console.log(`POW! POW!`);
      alert(`POW! POW!`);
      this.changeSustane(-4);
      return `POW! POW!`;
    }
  }

  manager.showCode(main);

  return {
    createElf: () => { window.elf = new Elf(prompt('What name is ready for elf?', 'Legolas'), 89) },
    operations: {
      saySomethingOnElfish() {
        let elf = window.elf;
        if (!elf) {
          alert(`First of all need to create an elf.`);
          return;
        }
        elf.sayOnElfish(prompt('Що вам перекласти на ельфійський?'));
      },
      getCurrentAgeOfElf() {
        let elf = window.elf;
        if (!elf) {
          alert(`First of all need to create an elf.`);
          return;
        };
        elf.currentAge();
      },
      giveWeaponToElf() {
        let elf = window.elf;
        if (!elf) {
          alert(`First of all need to create an elf.`);
          return;
        };
        const bow = new Bow();
        elf.takeBow(bow);
      },
      hitAnElf() {
        let elf = window.elf;
        if (!elf) {
          alert(`First of all need to create an elf.`);
          return;
        };
        let power = +prompt('How strong do you want to hit him?', 0);
        power = isNaN(power) ? 0 : power;
        let status = elf.takeADamage(power);
        if (status === 'dead') delete window.elf;
      },
      elfHitYou() {
        let elf = window.elf;
        if (!elf) {
          alert(`First of all need to create an elf.`);
          return;
        };
        elf.useRandomAttack();
      }
    }
  }
}

let RaceAPI = main();