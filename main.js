let weather = {
    'api_key': '1d7cdc9292336940f13e070b3ec37a83', // المفتاح الخاص بالموقع
    fetchWeather : function(city, lang){
        //الدالة الخاصة بجلب البيانات من موقع open weather map 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${this.api_key}`)
        .then((res)=>res.json()).then((data)=>{
            this.displayWeather(data);
        })
    },
    displayWeather :function(data){
        // الدالة الخاصة بعرض التفاصيل بعد جلبها 
        const {name}= data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector('.city').innerText= `الطقس في ${name}`;
        document.querySelector('.icon').src= `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector('.descrpition').innerText= description;
        let celcius = Math.round(parseFloat(temp)-273.15);
        document.querySelector('.temp').innerText= `${celcius} ℃` ;
        document.querySelector('.humidity').innerText= `% نسبة الرطوبة: ${humidity} `;
        document.querySelector('.wind').innerText= `سرعة الرياح:  ${speed} كم/س`;
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`
        document.querySelector('.card').style.background = `linear-gradient(to right top, rgb(214, 216, 78, 0.5), rgb(233, 35, 240, 0.7))`;

    },
    search: function(){
        // الدالة الخاصة بادخال المستخدم المدينة المراد معرفة الطقس الخاص بها
        let city = document.getElementById('search').value; 
        let lang= document.querySelector('html').lang;
        this.fetchWeather(city, lang);
    },
};
//عند الضغط على الزر 
document.querySelector('button').addEventListener('click', ()=>{
    weather.search();
});

// عند الضغط على زر ادخال من لوحة المفاتيح
document.querySelector('#search').addEventListener('keyup', (event)=>{
    if(event.key == 'Enter'){
        weather.search();
    }
});