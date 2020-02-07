//nupp kontrollimaks kas FileReader API on toetatud
    if(!FileReader){
        document.querySelector(".teave").classList.add("show")
    }

const fileUpload = document.querySelector("input#files") //faili lisamise lahter
const failiInfo = document.querySelector(".raamatuInfo > ul.info") //üldine info faili kohta
const loikFailist = document.querySelector(".raamatuInfo > ul.info") //väike lõik faili sisust
const pikimad = document.querySelector(".pikimad > ul.info") //nimekiri pikimatest sõnadest ja nende pikkustest
const valjaLoige = document.querySelector(".valjaLoige") //väike preview faili sisust
const sagedasemSona = document.querySelector(".sagedasem") //kõige sagedasem sõna



const fileSelected = () => {
    console.log("file valitud")
    const selectedFile = fileUpload.files[0]
    console.groupCollapsed("Faili info")
        console.log("Failinimi", selectedFile.name)
        console.log("Faili tüüp", selectedFile.type)
    console.groupEnd()

    failiInfo.innerHTML = ""

    failiInfo.innerHTML = 
    `
        <li>Failinimi: `+ selectedFile.name +`</li>
        <li>Faili tüüp: `+ selectedFile.type +`</li>
    `

    
    

    //lugeja
    var reader = new FileReader()




    reader.onload = () => {
        //siia et igal lugemisel nullida
        let suurim = 0;
        let suurimKogumik = []
        let kontroll = []

        var tekstiSisu = reader.result //loeme tekstisisu
        console.log("tekstisisu", tekstiSisu.substring(0,200))
        var sisu = tekstiSisu.split(/[^a-zA-ZõäöüÕÄÖÜ]+/gm) //jagame sõnadeks kasutades REGEX-i (koos eestikeele toega ;))
        console.log("sisu", sisu)

        //kuvame väikse väljalõike
        valjaLoige.innerHTML = ""
        valjaLoige.innerHTML = tekstiSisu.substring(0,500)
        


        for(let i = 0; i < sisu.length; i++){
            const kontrollitav = sisu[i]

            if(suurimKogumik.some(suurimKogumik => suurimKogumik.tekst.toLowerCase() == kontrollitav.toLowerCase())){
                //kontrollime kas selline sõna juba olemas nimekirjas
                continue
            }else{
            //kontrollime sõna pikkust ja kui on sama kui viimane siis lisame arraysse koos pikkusega ja kui pikem, tühjendame array (va esimene)
                if(i == 0){
                    suurim = kontrollitav.length
                    suurimKogumik.push({tekst: kontrollitav, pikkus: kontrollitav.length})
                    //kogume sõnad kokku
                    kontroll.push({tekst: kontrollitav, pikkus: kontrollitav.length, count: 0})
                }else

                if(kontrollitav.length == suurim){
                    suurimKogumik.push({tekst: kontrollitav, pikkus: kontrollitav.length})
                    kontroll.push({tekst: kontrollitav, pikkus: kontrollitav.length, count: 0})
                }

                if(kontrollitav.length > suurim){
                    suurimKogumik = []
                    suurim = kontrollitav.length
                    suurimKogumik.push({tekst: kontrollitav, pikkus: kontrollitav.length})
                    kontroll.push({tekst: kontrollitav, pikkus: kontrollitav.length, count: 0})
                }

            }

        }

        //loeme ära sõnad mis on 8 või pikemad:
        for (let i = 0; i < kontroll.length; i++) {
            const kontrollitav = kontroll[i];
            
            if(kontrollitav.tekst.length >= 8){
                for (let l = 0; l < sisu.length; l++) {
                    const sisend = sisu[l];
                    if(sisend.toLowerCase() == kontrollitav.tekst.toLowerCase()){
                        //lisame loendise 1 juurde kui sõnad on samad
                        kontrollitav.count += 1
                    }
                }
            }
        }

        //leiame suurima count-i
        let suurimCount = Math.max.apply(Math,kontroll.map((o) => {return o.count}))

        console.log("suurim count", suurimCount)

        //leiame suurima objekti
        let suurimObj = kontroll.find((o) => { return o.count == suurimCount})

        console.log("Kõige sagedamini esinev", suurimObj)
        sagedasemSona.querySelector("p").innerHTML = ""
        sagedasemSona.querySelector("span").innerHTML = ""
        sagedasemSona.querySelector("ul.info").innerHTML = ""
        sagedasemSona.querySelector("p").innerHTML = "Kõige sagedamine esinev sõna <b>"+suurimObj.tekst+"</b> (esineb "+suurimObj.count+" korda)"
        sagedasemSona.querySelector("span").innerHTML = "Teiste vähemalt 8 tähemärki sõnade sagedused:"

        for(let i = 0; i < kontroll.length; i++){
            const element = kontroll[i]

            if(element.pikkus >= 8 && element.count != suurimCount){
                console.log("sõna pikkus: "+element.pikkus+" ja maxPikkus: "+suurimCount)
                sagedasemSona.querySelector("ul.info").innerHTML+="<li>"+ element.tekst +" (esineb "+ element.count +" korda)</li>"
            }
        }
        
        

        

        pikimad.innerHTML = ""

        console.log("SuurimKogumik", suurimKogumik)
        console.log("Kontroll", kontroll)
        for (let i = 0; i < suurimKogumik.length; i++) {
            const element = suurimKogumik[i];
            pikimad.innerHTML += "<li>"+ element.tekst +" (pikkus: "+ element.pikkus +")</li>"
        }
        document.querySelector("#nupud").classList.add("nupudVasakule")
        document.querySelector("#tekst").classList.add("show")      
              
    }

    reader.readAsText(selectedFile)


}

// kontrollime kas faili on lisatud
fileUpload.addEventListener('change', fileSelected, false)