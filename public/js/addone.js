$(() => {
    let custBut = $('#custBut');
    let a;
    custBut.click(() => {
        a = $('#numInp').val();
        let custDiv = $('#custDiv');
        for (let i = 0; i < (a); i++) {
            //console.log("***");
            custDiv.append(`<div class="input-group mb-3" style="width:400px; text-align: center; align-items: center;margin-left:700px ;border: black;">
            <div class="input-group-prepend" style="border: black;">
              <span class="input-group-text" id="basic-addon3" >NAME OF ${(i+1)}th customer</span>
            </div>
            <input type="text" class="form-control nameCust" id="basic-url" aria-describedby="basic-addon3">
          </div>`)
        }
        custDiv.append(`<br><button id="nameOfCust" class="btn btn-outline-success">DONE</button><br>`)
        addCustomers();
    })
    let arr = [];
    let distances = [];
    async function addCustomers() {
        let custButton = $('#nameOfCust');
        await custButton.click(() => {
            let x = $('.nameCust');
            for (let i = 0; i < a; i++) {
                arr.push(x.get()[i].value);
            }


            let i;
            let distDiv = $('#distDiv');

            for (i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {

                    distDiv.append(`<div class="input-group mb-3" style="width:630px; text-align: center; align-items: center;margin-left:600px ;border: black;">
                <div class="input-group-prepend" style="border: black;">
                  <span class="input-group-text" id="basic-addon3" >Distance between [<b> ${ arr[i] } </b>] to [<b> ${arr[j]} </b>] </span>
                </div>
                <input type="text" class="form-control distInp" id="basic-url" aria-describedby="basic-addon3">
              </div>`)
                }
            }

            if (i == arr.length) {
                distDiv.append(`<button id="distOfCust" class="btn btn-outline-secondary"><a href="../loggedin.html">ADD THEM ALL</a></button>`)
            }
            addDistances();
        });

    }

    function addDistances() {
        let addDist = $('#distOfCust');

        addDist.click(() => {
            let distInp = $('.distInp');
            for (let i = 0; i < (a * (a - 1)) / 2; i++) {
                distances.push(distInp.get()[i].value);
            }
            console.log(distances);
            $.post('/add/', {
                nodes: arr,
                edges: distances
            }, (data) => {
                console.log("****" + data);
            })

        })

    }


})