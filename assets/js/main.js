$(document).ready(()=>{

    // Nav

    let stranice = ["Pocetna", "Osiguranje", "O nama", "Kontakt"];

    let navigacija = document.querySelector("#header");

    let navIspis = `<nav><ul class="menu">`;

    for(let stranica in stranice){
        navIspis += `<a href="#"><li>
        ${stranice[stranica]}
        </li></a>`;
    }

    navIspis += `</ul></nav>`;

    navigacija.innerHTML = navIspis;



    // Home page

    if(window.location.href.includes("/index")){
        let ponude = document.getElementById("ponude");

        let ponudeSlika = ["assets/img/pari-picture.jpg", "assets/img/asia-picture.jpg", "assets/img/machu-pichu-picture.jpg"];
        let ponudeNaslov = ["Evropa", "Azija", "Ostatak sveta"];
        let ponudeOpis = ["Ovo je opis za evropu. Tekst o evropi ce biti ovde.", "Ovo je opis za evropu. Tekst o evropi ce biti ovde.", "Ovo je opis za evropu. Tekst o evropi ce biti ovde."]

        let ponudeIspis = "";

        for(let i = 0; i < ponudeNaslov.length; i++){
            ponudeIspis +=`
                <div class="hPonuda">
                    <div class="hPonudaImage">
                        <img src="${ponudeSlika[i]}"/>
                    </div>
                    <h2>${ponudeNaslov[i]}</h2>
                    <p>${ponudeOpis[i]}</p>
                    <button>Pogledaj jos</button>
                </div>
            `;
        }

        ponude.innerHTML = ponudeIspis;

        // Slider

        let nizSliderSlika = ["assets/img/pari-picture.jpg", "assets/img/asia-picture.jpg", "assets/img/machu-pichu-picture.jpg"];
        let nizSliderAlt = ["Pariz", "Azija", "Macu Picu"];

        let sliderCounter = 0;

        setInterval(()=>{
            sliderCounter++;
            if(sliderCounter == nizSliderSlika.length){sliderCounter=0;}
            $("#slider img").attr({
                src: nizSliderSlika[sliderCounter],
                alt: nizSliderAlt[sliderCounter]
            })
        }, 3000);

    }

    

    // Forma za osiguranike ---- Osiguranje Page

    if(window.location.href.includes("/osiguranje")){
        let form = document.createElement("form");
        $(form).attr("id", "osiguranikForm");

        var brojOsiguranika;
        var backCounter;

        function createOsiguranikForm(index){
            let osiguranik = document.createElement("div");
            let title = document.createElement("h2");
            $(title).text(`Osiguranik broj ${index + 1}`);

            let nameSurname = document.createElement("input");
            $(nameSurname).attr({
                type: "text",
                name: "ime",
                placeholder: "Unestie ime i prezime",
                class: "nameSurname"
            })

            let jmbg = document.createElement("input");
            $(jmbg).attr({
                type: "text",
                name: "maticniBroj",
                placeholder: "Unesite maticni broj",
                class: "jmbg"
            })

            let godinaRodjenja = document.createElement("select");
            $(godinaRodjenja).attr("name", "godina-rodjenja");

            let izaberite = document.createElement("option");
            $(izaberite).text("Izaberite").attr("value", 0);
            $(godinaRodjenja).append(izaberite);

            for(let i = 1900; i<2026;i++){
                let godina = document.createElement("option");
                $(godina).attr("value", i).text(i);
                $(godinaRodjenja).append(godina);
            }

            brojOsiguranika = parseInt($("#kolikoOsiguranika").val());

            $(osiguranik).append(title, "<br/>", "Ime i prezime:", "<br/>", nameSurname, "<br/>", "JMBG:", "<br/>", jmbg, "<br/>", "Godina rodjenja:", "<br/>",godinaRodjenja, "<br/>");

            $(form).append(osiguranik);
            $("#formaOsiguranik").append(form);
        }

        function showData(){

            function getAllData(){
                return $(this).val();
            }

            let allNames = $(".nameSurname").map(getAllData).get();

            let allJmbg = $(".jmbg").map(getAllData);

            for(let i = 0; i < brojOsiguranika; i++){
                let dataPlace = document.createElement("p");
                let title = document.createElement("h2");
                $(title).text(`Korisnik broj ${i + 1}: `)
                $(dataPlace).html(`<p>Ime: ${allNames[i]}</p>  <p>JMBG: ${allJmbg[i]}</p>`);
                $("#dataCheck").append(title, "<br/>", dataPlace, "<br/>");
            }
        }

        function validateName(input) {
            let regex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]+(\s[A-ZČĆŽŠĐ][a-zčćžšđ]+)+$/;
            let name = $(input).val();
            let isValid = regex.test(name);
            setBorder(input, isValid);
            return isValid;
        }
        
        function validateJMBG(input) {
            let regex = /^\d{13}$/;
            let jmbg = $(input).val();
            let isValid = regex.test(jmbg);
            setBorder(input, isValid);
            return isValid;
        }
        
        function setBorder(element, isValid){
            $(element).css("border", isValid ? "2px solid green" : "2px solid red");
        }

        $("#kolikoOsiguranika").change(() => {
            brojOsiguranika = parseInt($("#kolikoOsiguranika").val());
        
            console.log(brojOsiguranika);
        
            $(form).empty();
            $("#formaOsiguranik").empty().hide();
            $("#backForward").empty().hide(); 
        
            if (brojOsiguranika > 0) {
                $("#kolikoOsiguranika").fadeOut(500, function () {

                    for (let i = 0; i < brojOsiguranika; i++) {
                        createOsiguranikForm(i);
                    }
        
                    let back = $("<div>").html("&larr;").addClass("backForwardButton");
                    let forward = $("<div>").html("&rarr;").addClass("backForwardButton");
        
                    $(back).off("click").click(() => {
                        if (backCounter == 0) {
                            console.log($("#osiguranikWrapper"));
                            $("#kolikoOsiguranika").val("0").fadeIn(500);
                            $(form).empty();
                            $("#formaOsiguranik").empty();
                            $("#backForward").hide();
                        } else {
                            $("#formaOsiguranik").fadeIn(1000);
                            $("#dataCheck").empty();
                            $(forward).show();
                            backCounter = 0;
                        }
                    });
        
                    $(forward).click(() => {
                        let allValid = true;
        
                        $(".nameSurname").each(function () {
                            if (!validateName(this)) allValid = false;
                        });
        
                        $(".jmbg").each(function () {
                            if (!validateJMBG(this)) allValid = false;
                        });
        
                        if (allValid) {
                            backCounter++;
                            $(forward).hide();
                            $("#formaOsiguranik").fadeOut(500, function () {
                                showData();
                            });
                        }
                    });
        
                    $("#backForward").append(back, forward);
                    $("#formaOsiguranik").fadeIn(500);
                    $("#backForward").fadeIn(500);
                });
            }
        });

        $(document).on("blur", ".nameSurname", function(){
            validateName(this);
        });

        $(document).on("blur", ".jmbg", function(){
            validateJMBG(this);
        });
    }

    
})