const datas = document.querySelector("textarea")
const to = document.querySelector("#langToConvert")
const ans = document.querySelector("#ans");
const swap = document.querySelector("#swap");
const clear = document.querySelector("#clear");
const speak = document.querySelector('#speak')
const submit = document.querySelector("#form");
const audio = document.querySelector('audio');
let check = true;
const languages = lan();
let d = '';
const keys = Object.keys(languages);
const values = Object.values(languages);
const l = ['gu', 'kn', 'ml', 'te', 'pa', 'mr']
let voice=''
for (let i = 0; i < 107 ; i++)
{
    to.options[i].value = keys[i];
    to.options[i].innerText = values[i];
}

swap.addEventListener('click', () => {
   const temp = datas.value;
   datas.value = ans.innerHTML;
   ans.innerHTML = temp;   
})
clear.addEventListener('click', () => {
   datas.value = '';
   ans.innerHTML = '';
   audio.src = '';
   check = true;
})
let lanC = '';
speak.addEventListener('click', async () => {
   audio.hidden = true;   
   if (audio.src.includes('false')) {
      let voice = new SpeechSynthesisUtterance(ans.innerHTML);
      if (l.indexOf(to.value) !== -1) {
         voice.lang = 'hi-IN';
         speechSynthesis.speak(voice);
         //audio.hidden = true;
      } else {
         speechSynthesis.speak(voice);
         //audio.hidden = true;
      }
   
   } else
      audio.play();
})
let data;
submit.addEventListener('submit', async (e) => {
    e.preventDefault()
   check = true;
   audio.src = '';
   let fdm = new FormData()
   fdm.append(datas.name, datas.value);
   fdm.append(to.name, to.value);
   const t = new URLSearchParams(fdm);
   
    data = await fetch(submit.action, {
         method: 'POST',
         body: t
   });
   let res = await data.json();
  
   audio.src = res.v;
   ans.innerHTML=res.a
})