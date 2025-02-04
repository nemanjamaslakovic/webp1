$(document).ready(()=>{

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
        $("#osiguranikWrapper").addClass("slide-in-left");
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

    $("#kolikoOsiguranika").change(()=>{
        brojOsiguranika = parseInt($("#kolikoOsiguranika").val());

        console.log(brojOsiguranika);

        $(form).empty;
        $("#formaOsiguranik").empty().show();
        $("#backForward").empty().show();
        $("#osiguranikWrapper").removeClass("slide-out-right");

        if(brojOsiguranika > 0){
            $("#kolikoOsiguranika").hide();
            $("#backForward").show();

            for(let i = 0; i < brojOsiguranika; i++){
                createOsiguranikForm(i);
            }

            let back = document.createElement("div");
            $(back).html("&larr;").addClass("backForwardButton");

            let forward = document.createElement("div");
            $(forward).html("&rarr;").addClass("backForwardButton");

            $(back).off("click").click(()=>{
                if(backCounter == 0){
                    $("#osiguranikWrapper").removeClass("slide-in-left");
                    console.log($("#osiguranikWrapper"));
                    $("#kolikoOsiguranika").val("0").show();
                    $(form).empty();
                    $("#formaOsiguranik").empty();
                    $("#backForward").hide();
                }else{
                    $("#formaOsiguranik").removeClass("slide-out-left");
                    $("#formaOsiguranik").show();
                    $("#dataCheck").empty();
                    $(forward).show();
                    backCounter = 0;
                }
            });

            $(forward).click(() => {
                
                let allValid = true;

                $(".nameSurname").each(function () {
                    if(!validateName(this)) allValid = false;
                });
            
                $(".jmbg").each(function () {
                    if(!validateJMBG(this)) allValid = false;
                });
            
                if (allValid) {
                    backCounter++;
                    $(forward).hide();
                    $("#formaOsiguranik").addClass("slide-out-left");
                    setTimeout(() => {
                        $("#formaOsiguranik").hide();
                        showData();
                    }, 500);  
                }
            });

            $("#backForward").append(back, forward);
        }
    });

    $(document).on("blur", ".nameSurname", function(){
        validateName(this);
    });

    $(document).on("blur", ".jmbg", function(){
        validateJMBG(this);
    });
})