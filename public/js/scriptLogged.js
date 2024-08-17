$(() => {
    //let a = 0;
    let navbar = $('#i2');
    $.get('/login/done', (data) => {
        console.log(data);
        console.log(data.username);
        navbar.append(`
        <div style="margin-left: 630px; margin-right: 10px;">
            <form class="form-inline my-2 my-lg-0" method="GET" action="/profile">
                <button type="submit" class="btn btn-outline-warning form-inline my-2 my-lg-0">${data.username}</button>
        </div>       
        `)
        addSingleManData();
    })
    let divAdd = $('#divAdd');

    function addSingleManData() {
        $.get('/add/getAll', (data) => {
            let r = 1;
            console.log("**" + data);
            for (let i of data) {
                console.log(i.id);
                if (r == 1) {
                    divAdd.prepend(`
                <button type="button" title="THIS IS YOUR PREVIOUS GRAPH" class="graph btn btn-outline-primary" value="${i.id}" style="padding: 20px;margin-left: 590px; width: 600px; display: block;">THIS IS YOUR ${r}th GRAPH </button>
            
            `);
                } else {
                    divAdd.prepend(`
                <button type="button" title="THIS IS YOUR PREVIOUS GRAPH" class="graph btn btn-outline-primary" value="${i.id}" style="padding: 20px;margin-left: 590px; width: 600px; display: block;">THIS IS YOUR ${r}th GRAPH </button>
            
            <br>`);
                }
                r += 1;
            }
            ifClicked();
        })
    }

    function ifClicked() {
        let graphh = $('.graph');
        graphh.click((event) => {
            //console.log(event.currentTarget.attributes[3].nodeValue);
            //abcd = [event.currentTarget.attributes[3]]
            //console.log(abcd);
            //console.log(graphh.val());
            $.post('/open', { id: event.currentTarget.attributes[3].nodeValue }, (data) => {
                console.log(data);
                window.location.replace("/components/openGraph.html");
            });

        })
    }
})