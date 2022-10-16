const datas = document.querySelector("textarea")
const to = document.querySelector("#langToConvert")
const ans = document.querySelector("#ans");
const swap = document.querySelector("#swap");
const clear = document.querySelector("#clear");
const speak = document.querySelector('#speak')
const submit = document.querySelector("#form");
const audio = document.querySelector('audio');
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
   audio.src = '';})
let lanC = '';
speak.addEventListener('click', async () => {
   audio.hidden = true;   
   if (audio.src.length<=43) {
      let voice = new SpeechSynthesisUtterance(ans.innerHTML);
      if (l.indexOf(to.value) !== -1) {
         voice.lang = 'hi-IN';
         speechSynthesis.speak(voice);
      } else {
         speechSynthesis.speak(voice);
      }
   }else if(ans .innerHTML.trim() == '')  {
      let voice = new SpeechSynthesisUtterance("There is no text to speak");
      speechSynthesis.speak(voice);
   }
   else
      audio.play();
})
submit.addEventListener('submit',  (e) => {
   e.preventDefault();
   audio.src = '';
   if (datas.value.trim() == '')
   {
      let voice = new SpeechSynthesisUtterance("There is no text to speak");
      speechSynthesis.speak(voice);
   }
   else
      put();
})
async function put() {
   let fdm = new FormData()
   fdm.append(datas.name, datas.value);
   fdm.append(to.name, to.value);
   let data = new URLSearchParams(fdm);
    data = await fetch(submit.action, {
       method: 'POST',
       body: data
   });
   let res = await data.json();
   if (res.v.includes('false'))
      audio.src = ''
   else {
      audio.src = res.v;
      console.log(res.v);
   }
   ans.innerHTML=res.a
}