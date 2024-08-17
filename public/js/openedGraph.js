$(() => {
    let cy = cytoscape({

        container: document.getElementById('cy'), // container to render in

        elements: [ // list of graph elements to start with
            // { group: 'nodes',data: { id: 'n1' }, position: { x: 200, y: 100 } },
            // { group: 'nodes',data: { id: 'n2' }, position: { x: 100, y: 50 } },
            // { group: 'edges',data: { id: 'e0', source: 'n1', target: 'n2' } }
        ],

        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#69e',
                    'label': 'data(id)',
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 1,
                    'line-color': '#369',
                    'target-arrow-color': '#369',
                    'target-arrow-shape': 'triangle',
                    'label': 'data(label)',
                    'font-size': '25px',
                    'color': 'black'
                }
            }
        ],

        style: cytoscape.stylesheet()
            .selector('edge')
            .css({
                'width': 3,
                'line-color': '#369',
                'target-arrow-color': '#369',
                'target-arrow-shape': 'triangle',
                'label': 'data(label)',
                'font-size': '25px',
                'color': 'black'
            })
            .selector('node')
            .css({
                'content': 'data(id)',
                'text-valign': 'center',
                'color': 'white',
                'text-outline-width': 2,
                'text-outline-color': '#888',
                'background-color': '#888'
            })
            .selector(':selected')
            .css({
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black',
                'text-outline-color': 'black'
            }),

        layout: {
            name: 'grid',
            rows: 1
        }

    });
    let arr = [];
    let no, ed;
    $.get('/open', (data) => {
        console.log(data[0].id);
        no = data[0].nodes.split(" ");
        ed = data[0].edges.split(" ");
        console.log(no + "***");
        console.log(ed);


        let p = 1;
        for (let i = 0; i < no.length - 1; i++) {

            arr.push({ group: 'nodes', data: { id: `${no[i]}` }, position: { x: 350 - 300 * Math.random(), y: 280 - 240 * Math.random() } });

        }
        console.log(arr + " ))))))");
        let y = 0;
        for (let i = 0; i < no.length - 1; i++) {
            for (let j = i + 1; j < no.length - 1; j++) {
                arr.push({ group: 'edges', data: { id: `${no[i]}${no[j]}`, source: `${no[i]}`, target: `${no[j]}`, label: `${ed[y]}` } })
                y++;
            }
        }

        console.log(arr);
        console.log("******");
        cy.add(arr);
        datastr();
    })

    cy.on('click', 'node', function(evt) {
        var node = evt.target;

        console.log(node.position());
    });
    let singleBut = $('#single');
    let factoryBut = $('#factory');
    let singleDiv = $('#singleDiv');
    let factoryDiv = $('#factoryDiv');
    let spanSingle = $('#spanSingle');
    let butDone = $('#butDone');
    let spanStart = $('#spanStart');
    let spanPath = $('#spanPath');
    let StartingInp = $('#StartingInp');
    let butStart = $('#butStart');
    let doneWork = $('#doneWork');
    singleDiv.hide();
    factoryDiv.hide();
    spanSingle.hide();
    butDone.hide();
    spanStart.hide();
    butStart.hide();
    StartingInp.hide();
    doneWork.hide();
    spanPath.hide();
    $('#dWork').hide();
    async function datastr() {

        let edd = [];
        console.log(no);
        for (let i = 0; i < ed.length - 1; i++) {
            edd.push(parseInt(ed[i]));
        }
        console.log(edd + "*()");
        await $.post('/dss', { nodes: no, edges: edd }, (data) => {
            console.log(data + "(((((((((((((((((((((((((");
            singleman(data);
            factoryman(data);
        })

    }

    function singleman(data) {
        singleBut.click(() => {
            singleBut.hide();
            factoryBut.hide();
            singleDiv.show();
            spanStart.show();
            butStart.show();
            StartingInp.show();
            spanPath.show();
            //cy.$(`#ab`).select();
            butStart.click(() => {
                cy.$('#' + StartingInp.val()).select();

                spanSingle.show();
                butDone.show();
                let map = {};
                map[StartingInp.val()] = 1;
                let floyd = data.fw;
                let path = data.path;
                // console.log(floyd);
                let curr = StartingInp.val()
                butDone.click(() => {
                    if (Object.keys(map).length == Object.keys(floyd[curr]).length) {
                        butDone.hide();
                        spanSingle.hide();
                        spanStart.hide();
                        butStart.hide();
                        doneWork.show();
                        StartingInp.hide();
                        spanPath.hide();
                    } else {
                        let newcurr = "";
                        let min = Number.MAX_VALUE;
                        // console.log(floyd[curr]);
                        let v = floyd[curr];
                        for (let k in floyd[curr]) {
                            //console.log(k);
                            if (!map[k] && min > v[k]) {
                                newcurr = k;
                                min = v[k];
                            }
                        }
                        map[newcurr] = 1;
                        console.log("**" + `#${curr}${newcurr}`);
                        let cu = newcurr;
                        let p = `${curr} => `;
                        while (true) {
                            if (path[curr][newcurr] == newcurr) {
                                break;
                            }
                            cy.$(`#${curr}${path[curr][newcurr]}`).select();
                            cy.$(`#${path[curr][newcurr]}${curr}`).select();
                            curr = path[curr][newcurr];
                            p += `${curr} => `
                        }
                        cy.$(`#${curr}${newcurr}`).select();
                        cy.$(`#${newcurr}${curr}`).select();
                        p += `${newcurr}`;
                        console.log(p);
                        spanPath.text(`Path is ${p}`);
                        cy.$(`#${newcurr}`).select();
                        curr = newcurr;
                    }
                })

                // cy.$('#a').select();
                // cy.$('#edg1').select();
            })





        })
    }

    function factoryman(data) {
        factoryBut.click(() => {
            singleBut.hide();
            factoryBut.hide();
            factoryDiv.show();
            var collection = cy.elements();
            // console.log(collection);
            cy.remove(collection);
            let arr2 = [];
            let prism = data.prism;
            //console.log(prism.nodes + "=nodes");
            for (let po in prism.nodes) {
                arr2.push({ group: 'nodes', data: { id: `${prism.nodes[po]}` }, position: { x: 350 - 300 * Math.random(), y: 280 - 240 * Math.random() } });
            }
            let mm = {};
            let list = {};
            //console.log(prism.edges + "=edges");
            for (let po in prism.edges) {
                //console.log(po + " =po");
                ///console.log(prism.edges[po] + "*********");
                for (let io = 0; io < prism.edges[po].length; io++) {
                    //console.log(io + "io");
                    //console.log(prism.edges[po][io].node + "***");
                    //console.log(list + "======list======");
                    if (!mm[`${po}${prism.edges[po][io].node}`] && !mm[`${prism.edges[po][io].node}${po}`]) {

                        mm[`${po}${prism.edges[po][io].node}`] = 1;
                        //console.log(list[`${po}`] + "(())");
                        if (!list[`${po}`]) {
                            let yop = [];
                            yop.push(prism.edges[po][io].node);
                            list[`${po}`] = yop;
                            //console.log(list[`${po}`] + "))");
                        } else {
                            //console.log("**********");

                            if (typeof(list[`${po}`]) == 'string') {
                                let yop = [list[`${po}`]];
                                yop.push(prism.edges[po][io].node);
                                list[`${po}`] = yop;
                            } else {
                                list[`${po}`].push(prism.edges[po][io].node);
                            }
                        }
                        if (!list[`${prism.edges[po][io].node}`]) {
                            list[`${prism.edges[po][io].node}`] = [];
                            list[`${prism.edges[po][io].node}`].push(`${po}`);
                        } else {
                            console.log("************************************");



                            list[`${prism.edges[po][io].node}`].push(po);
                        }
                        list[`${prism.edges[po][io].node}`] = po;
                        arr2.push({ group: 'edges', data: { id: `${po}${prism.edges[po][io].node}`, source: `${po}`, target: `${prism.edges[po][io].node}`, label: `${prism.edges[po][io].weight}` } })
                    }
                }
            }
            console.log("arr2 " + arr2);
            StartingInp.show();
            spanStart.show();
            butStart.show();
            cy.add(arr2);
            console.log(list);
            butStart.click(async() => {
                cy.$(`#${StartingInp.val()}`).select();
                // cy.$(`#${newcurr}${curr}`).select();
                let t = {};
                let arrr = [];
                t[StartingInp.val()] = 1;
                arrr.push(StartingInp.val());
                //console.log(StartingInp.val());
                //console.log(arrr);
                let u = 0;
                //console.log(Object.keys(t).length);
                //console.log(no);
                let aa = [];
                aa.push(`#` + StartingInp.val());
                while (Object.keys(t).length < no.length - 1) {

                    let r = arrr[u];
                    u++;
                    console.log(r);
                    console.log(typeof(list[r]));
                    if (typeof(list[r]) == 'string') {
                        arrr.push(list[r]);
                        t[list[r]] = 1;
                        // let xc = Date.now() + 1000;
                        // while (Date.now() < xc) {};
                        // cy.$(`#${r}${list[r]}`).select();
                        // cy.$(`#${list[r]}${r}`).select();
                        // cy.$(`#${list[r]}`).select();
                        aa.push(`#${r}${list[r]}`);
                        aa.push(`#${list[r]}${r}`);
                        aa.push(`#${list[r]}`);
                    } else {
                        for (let q = 0; q < list[r].length; q++) {
                            if (!t[list[r][q]]) {
                                arrr.push(list[r][q]);

                                console.log(arrr);
                                t[list[r][q]] = 1;
                                // let xc = Date.now() + 1000;
                                // while (Date.now() < xc) {};
                                // cy.$(`#${r}${list[r][q]}`).select();
                                // cy.$(`#${list[r][q]}${r}`).select();
                                // cy.$(`#${list[r][q]}`).select();
                                aa.push(`#${r}${list[r][q]}`)
                                aa.push(`#${list[r][q]}${r}`)
                                aa.push(`#${list[r][q]}`)
                            }
                        }
                    }
                    //console.log(arrr);
                }
                //console.log(t);
                console.log(aa);
                u = 0;
                callLast(aa);
            })

            function pro(lo) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        cy.$(`${lo}`).select();
                        resolve();
                    }, 500)

                })
            }
            async function callLast(aa) {
                for (let iop = 0; iop < aa.length; iop++) {
                    console.log(aa[iop]);
                    await pro(aa[iop]);
                }
                doneWork.show()
                $('#dWork').show();
            }


            //console.log(arr2);

        })
    }



















    var dijkstra = cy.elements().dijkstra('#n1', function(edge) {
        return edge.data('label');
    });
    console.log(dijkstra.pathTo(cy.$('#n5')));
    console.log(dijkstra.distanceTo(cy.$('#n5')));
    var p = dijkstra.pathTo(cy.$('#n5'));
    // for(let i = 0; i < p.length; i++ ){
    //   console.log(i,p[i]._private.data.id);
    //   cy.$('#'+p[i]._private.data.id).select();
    // }

    let i = 0,
        tick = 1000;

    (function() {
        if (i < p.length) {
            cy.$('#' + p[i]._private.data.id).select();
            i++;
            setTimeout(arguments.callee, tick)
        }
    })()
    // for(let i = 0; i < p.length; i++ ){
    //   console.log(i,p[i]._private.data.id);
    //   cy.$('#'+p[i]._private.data.id).select();
    // }

})