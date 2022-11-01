// Створити калькулятор, як приклад у прикріпленому відео - 
// Не обов'язково ідеально повинен бути той самий дизайн, стилі, ефекти, тощо. Головне - функіонал. Стилі та ефекти - на власний смак та розсуд
// Функціонал повинен бути зрозумілим та робочим
// Ділення на 0 або інші математично не правильні операції - закінчуватись повідомленням - Not a number, або Error: Invalid operation
// Кнопка АС - затирає вміст на екрані вводу
// Кнопки % та +/- НЕ ПОТРІБНО додавати

window.onload = init

function init () {

const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const clear_btn = document.querySelector("button[data-type=clear]")
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let is_operator = false;
let equation = [];
clear_btn.value = 'AC';

const remove_active = () => {
  operator_btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    if (output.value === "0" && e.target.value !== "." || output.value === "Error") {
      output.value = e.target.value;
      clear_btn.innerText = 'C';
    } else if (is_operator) {
      output.value = (e.target.value === '.' ? '0' : '') + e.target.value;
      is_operator = false;
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "");
    } else {
      output.value = output.value + "" + e.target.value;
    }
  });
});

operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "=":
        equation.push(output.value);
        const result = eval(equation.join(""));
        checkCorrectValue(result);
        equation.join("");
        equation = [];
        break;
      default:
        let last_item = equation[equation.length - 1]
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
        }
        is_operator = true;
        break;
    }
  });
});

clear_btn.addEventListener('click', () => {
  clear_btn.innerText = 'AC';
});

function checkCorrectValue (result) {
  if (isNaN(result) || result == "Infinity" || result == "-Infinity") {
    output.value = "Error";
  } else {
    output.value = parseFloat(result.toPrecision(12));
  }
  return output.value
}

// Створити ToDo List, як на прикладі у прикліпленому відео
// Кожен елемент - додається при кліку на кнопку
// Стилі та ефекти - на власний смак та розсуд

const toDoList = document.querySelector('.to-do-list');
const toDoListInput = document.querySelector('.to-do-list_input');
const toDoListBtn = document.querySelector('.to-do-list_btn');

toDoListBtn.addEventListener('click', () => {
  const newToDo = document.createElement('p');
  newToDo.classList.add('to-do-list_element');
  newToDo.innerText = toDoListInput.value;
  toDoList.appendChild(newToDo);
  toDoListInput.value = "";
})

}
