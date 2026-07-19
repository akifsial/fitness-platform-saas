const age = document.querySelector("#ageId");
const height = document.querySelector("#heightId");
const weight = document.querySelector("#weightId");
const result = document.querySelector("#resultId");
const calculateBtn = document.querySelector("#btnId");
const clearBtn = document.querySelector("#clearId");

calculateBtn.addEventListener("click", () => {

const ageValue = Number(age.value);
const heightValue = Number(height.value);
const weightValue = Number(weight.value);

const gender = document.querySelector('input[name="gender"]:checked');


if(!ageValue || ageValue < 2 || ageValue > 120) {
    result.innerHTML ="<p class='text-red-600 font-bold'>Please enter a validage (2 - 120).</p>";
    return;
}
if(!gender) {
    result.innerHTML ="<p class='text-red-600 font-bold'>Please select yourgender.</p>";
    return;
}
if(!heightValue || heightValue < 50 || heightValue > 250) {
    result.innerHTML ="<p class='text-red-600 font-bold'>Height must be between50 and 250 cm.</p>";
    return;
}
if(!weightValue || weightValue < 10 || weightValue > 300) {
    result.innerHTML =
    "<p class='text-red-600 font-bold'>Weight must be between 10 and 300 kg.<p>";
    return;
}


const heightInMeter = heightValue / 100;
const bmi = weightValue / (heightInMeter * heightInMeter);

let category = "";
let color = "";

if(bmi < 18.5) {
    category = "Underweight";
    color = "text-blue-600";
}
else if(bmi < 25) {
    category = "Normal Weight";
    color = "text-green-600";
}
else if(bmi < 30) {
    category = "Overweight";
    color = "text-yellow-600";
}
else{
    category = "Obese";
    color = "text-red-600";
}

result.innerHTML = 
   `<div class="text-center shadow-lg p-5 rounded-xl border mt-5">
      <h2 class="text-2xl font-bold">Result</h2>
      <p class="mt-2"><span class="font-semibold">Age:</span> ${ageValue}</p>
      <p><span class="font-semibold">Gender:</span> ${gender.value}</p>
      <p><span class="font-semibold">BMI:</span>${bmi.toFixed(2)}</p>
      <p class="${color} font-bold text-xl mt-2">${category}</p>
    </div>`;
});

clearBtn.addEventListener("click", () => {

    age.value = "";
    height.value = "";
    weight.value = "";


    document.querySelector("#male").checked = false;
    document.querySelector("#female").checked = false;

    result.innerHTML = "";

});