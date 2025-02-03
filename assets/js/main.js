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

    function validateName(name) {
        let regex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]+(\s[A-ZČĆŽŠĐ][a-zčćžšđ]+)+$/;
        return regex.test(name);
    }
    
    function validateJMBG(jmbg) {
        let regex = /^\d{13}$/;
        return regex.test(jmbg);
    }
    
    $("#kolikoOsiguranika").change(()=>{
        brojOsiguranika = parseInt($("#kolikoOsiguranika").val());

        console.log(brojOsiguranika);

        $(form).empty;
        $("#formaOsiguranik").empty().show();
        $("#backForward").empty().show();

        if(brojOsiguranika > 0){
            $("#kolikoOsiguranika").hide();
            $("#backForward").show();

            for(let i = 0; i < brojOsiguranika; i++){
                createOsiguranikForm(i);
            }

            let back = document.createElement("p");
            $(back).text("Nazad");

            let forward = document.createElement("p");
            $(forward).text("Sledece");

            $(back).off("click").click(()=>{
                if(backCounter == 0){
                    $("#kolikoOsiguranika").val("0").show();
                    $(form).empty();
                    $("#formaOsiguranik").empty();
                    $("#backForward").hide();
                }else{
                    $("#formaOsiguranik").show();
                    $("#dataCheck").empty();
                    $(forward).show();
                    backCounter = 0;
                }
            });

            $(forward).click(() => {
                let allValid = true;
            
                $(".nameSurname").each(function () {
                    if (!validateName($(this).val())) {
                        $(this).css("border", "2px solid red");
                        allValid = false;
                    } else {
                        $(this).css("border", "2px solid green"); 
                    }
                });
            
                $(".jmbg").each(function () {
                    if (!validateJMBG($(this).val())) {
                        $(this).css("border", "2px solid red"); 
                        allValid = false;
                    } else {
                        $(this).css("border", "2px solid green"); 
                    }
                });
            
                if (allValid) {
                    backCounter++;
                    $(forward).hide();
                    $("#formaOsiguranik").hide();
                    showData();
                }
            });

            $("#backForward").append(back, forward);
        }
    })
})