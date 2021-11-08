/**
 * Класс для позиций меню
 */
class MenuPosition {
    /**
     * Конструктор создает объект позиции меню
     * @param {number} price - цена 
     * @param {number} calories - калории
     */
    constructor(price, calories) {
        this._price = price;
        this._calories = calories;
    }
    /**
     * Получает цену позиции
     */
    getPrice() {
        return this._price;
    }
    /**
     * Получает калории позиции
     */
    getCalories() {
        return this._calories;
    }
}

/**
 * Класс напитка из меню
 */
class Drink extends MenuPosition {
    /**
     * Названия напитков
     */
    static DRINK_NAME_COLA = "Кола";
    static DRINK_NAME_COFFEE = "Кофе";
    /**
     * @param {string} name - Название напитка
     */
    constructor(name) {
        if (name === Drink.DRINK_NAME_COLA) {
            super(50, 40);
        } else if (name === Drink.DRINK_NAME_COFFEE) {
            super(80, 20);
        } else {
            throw new Error("У нас нет таких напитков!")
        }
        this.name = name;
    }
}

/**
 * Класс салата из меню
 */
class Salad extends MenuPosition {
    /**
     * Названия салатов
     */
    static SALAD_NAME_CAESAR = "Цезарь";
    static SALAD_NAME_OLIVIE = "Оливье";
    /**
     * 
     * @param {string} name - Название салата
     * @param {number} weight - Вес, г
     */
    constructor(name, weight) {
        if (name === Salad.SALAD_NAME_CAESAR) {
            super(100 * weight / 100, 20 * weight / 100);
        } else if (name === Salad.SALAD_NAME_OLIVIE) {
            super(50 * weight / 100, 80 * weight / 100);
        } else {
            throw new Error("У нас нет таких салатов!")
        }
        this.name = name;
        this.weight = weight;
    }
}

/**
 * Класс гамбургера
 */
class Hamburger extends MenuPosition {
    /* Размеры, виды начинок и добавок */
    static SIZE_LARGE = "большой";
    static SIZE_SMALL = "маленький";
    static STUFFING_CHEESE = "сыр";
    static STUFFING_SALAD = "салат";
    static STUFFING_POTATO = "картофель";
    /**
     * 
     * @param {string} size - Размер гамбургера
     * @param {string} stuffing - Начинка гамбургера
     */
    constructor(size, stuffing) {
        let price = 0;
        let calories = 0;

        switch (size) {
            case Hamburger.SIZE_LARGE:
                price = 100;
                calories = 40;
                break;
            case Hamburger.SIZE_SMALL:
                price = 50;
                calories = 20;
                break;
            default:
                throw new Error("У нас нет таких размеров.");
        }
        switch (stuffing) {
            case Hamburger.STUFFING_CHEESE:
                price += 10;
                calories += 20;
                break;
            case Hamburger.STUFFING_SALAD:
                price += 20;
                calories += 5;
                break;
            case Hamburger.STUFFING_POTATO:
                price += 15;
                calories += 10;
                break;
            default:
                throw new Error("У нас нет таких начинок.");
        }
        super(price, calories);
    }
}

/**
 * Класс заказ 
 * (Композиция, т.к. он содержит массив экземпляров других классов (Drink, Hamburger etc))
 * Пример использования:
 * const myTestOrder = [
 *      new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO),
 *      new Drink( Drink.DRINK_NAME_COFFEE)
 * ];
 * const order = new Order(myTestOrder);
 * order.addItem(new Hamburger("маленький", "сыр"));
 * order.removeItem(0);
 * order.pay();
 */
class Order {
    isPaid = false;
    /**
     * @param {*} order - undefined/ массив наследников MenuPosition
     */
    constructor(order) {
        if (order === undefined) {
            this._order = [];
        }
        this._order = order;
    }
    /**
     * Посчитать итоговую сумму заказа
     */
    countOrder() {
        let priceSum = 0;
        let caloriesSum = 0;
        for (let i = 0; i < this._order.length; i++) {
            priceSum += this._order[i].getPrice();
            caloriesSum += this._order[i].getCalories();
        }
        return [priceSum, caloriesSum];
    }
    /**
     * Добавить новую позицию меню
     * @param {*} item - позиция меню
     */
    addItem(item) {
        if (!this.isPaid) {
            this._order.push(item);
        } else {
            throw new Error("Заказ уже оплачен!")
        }
    }
    /**
     * Убрать позицию меню
     * @param {number} index - номер позиции меню
     */
    removeItemByIndext(index) {
        if (!this.isPaid) {
            this._order.splice(index, 1);
        } else {
            throw new Error("Заказ уже оплачен!")
        }
    }
    /**
     * Оплатить заказ
     */
    pay() {
        this.isPaid = true;
    }
}


module.exports = {
    MenuPosition,
    Hamburger,
    Salad,
    Drink,
    Order
}