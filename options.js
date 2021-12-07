document.addEventListener('DOMContentLoaded', (event) => {

    async function wypelnijPola() {
        await chrome.storage.sync.get(['studiaRodzaj'], function (studiaRodzajValue) {
            if (studiaRodzajValue.studiaRodzaj > 0) {
                document.querySelector('select[name="studiaRodzaj"]').options[studiaRodzajValue.studiaRodzaj].selected = true;

                chrome.storage.sync.get(['studiaStopien'], function (studiaStopienValue) {
                    if (studiaStopienValue.studiaStopien > 0) {
                        document.querySelector('select[name="studiaStopien"]').options[studiaStopienValue.studiaStopien].selected = true;

                        if (studiaRodzajValue.studiaRodzaj === 1) {
                            switch (studiaStopienValue.studiaStopien) {
                                case 1:
                                    populateGroup(1, 'stopien1');
                                    break;
                                case 2:
                                    populateGroup(1, 'stopien2');
                                    break;
                                case 3:
                                    populateGroup(1, 'stopien3');
                                    break;
                                    
                            }
                        } else if (studiaRodzajValue.studiaRodzaj === 2) {
                            switch (studiaStopienValue.studiaStopien) {
                                case 1:
                                    populateGroup(2, 'stopien1');
                                    break;
                                case 2:
                                    populateGroup(2, 'stopien2');
                                    break;
                                case 3:
                                    populateGroup(2, 'stopien3');
                                    break;
                            }
                        }

                    } else {
                        document.querySelector('select[name="groupIndex"]').disabled = true;
                    }
                });

            } else {
                document.querySelector('select[name="studiaStopien"]').disabled = true;
            }
        });
    };

    wypelnijPola();

    chrome.storage.sync.get(['index'], function (indValue) {
        if (indValue.index > 0) {
            document.querySelector("#indexValueId").value = indValue.index;
        }
    });

});


document.querySelector('#submitBtn').addEventListener('click', initializeData);
document.querySelector('#studiaRodzaj').addEventListener('change', studiaRodzajSelect);
document.querySelector('#studiaStopien').addEventListener('change', studiaStopienSelect);
document.querySelector('#creator').addEventListener('click', redirectToCreatorGithub);

function initializeData() {
    var indexField = document.querySelector('#indexValueId').value;
    if (indexField === '' || indexField.match(/^\d+$/)) {
        const indexValue = document.querySelector('#indexValueId').value;
        chrome.storage.sync.set({index: indexValue});

        const groupIndex = document.querySelector('select[name="groupIndex"]').selectedIndex;
        chrome.storage.sync.set({groupIndex: groupIndex});

        const studiaRodzajValue = document.querySelector('select[name="studiaRodzaj"]').selectedIndex;
        chrome.storage.sync.set({studiaRodzaj: studiaRodzajValue});

        const studiaStopienValue = document.querySelector('select[name="studiaStopien"]').selectedIndex;
        chrome.storage.sync.set({studiaStopien: studiaStopienValue});

        alert("Zapisano informacje.");
    } else {
        alert("Prawidłowy indeks powinien składać się wycznie z cyfr.");
    }
};

function studiaRodzajSelect() {
    document.querySelector('select[name="studiaStopien"]').options[0].selected = true;
    studiaStopienSelect();

    var rodzajStudiaIndex = document.querySelector('select[name="studiaRodzaj"]').selectedIndex;
    if (rodzajStudiaIndex !== 0) {
        document.querySelector('select[name="studiaStopien"]').disabled = false;
    } else {
        document.querySelector('select[name="studiaStopien"]').disabled = true;
    }
};

async function studiaStopienSelect() {
    document.getElementById('groupIndex').replaceChildren();
    var stopienIndex = document.querySelector('select[name="studiaStopien"]').selectedIndex;
    var rodzajStudiaIndex = document.querySelector('select[name="studiaRodzaj"]').selectedIndex;

    if (stopienIndex !== 0) {
        document.querySelector('select[name="groupIndex"]').disabled = false;
    } else {
        document.querySelector('select[name="groupIndex"]').disabled = true;
        document.querySelector('select[name="groupIndex"]').value = 'wybierz';
    }
    
    switch (stopienIndex) {
        case 0:
            console.log("Nie wybrano stopnia studiow.");
            break;
        case 1:
            populateGroup(rodzajStudiaIndex, 'stopien1');
            break;
        case 2:
            populateGroup(rodzajStudiaIndex, 'stopien2');
            break;
        case 3:
            populateGroup(rodzajStudiaIndex, 'stopien3');
            break;
    }
};

function wypelnijGrupe() {
    chrome.storage.sync.get(['groupIndex'], function (grpValue) {
        try {
            document.querySelector('select[name="groupIndex"]').options[grpValue.groupIndex].selected = true;
        } catch (err) {
            console.log("Nothing to worry about. Just weird way to omit the error :)");
        }
    });
};

async function populateGroup(rodzajStudiow, stopienStudiow) {
    const groupsListRes = await fetch('./groupsList.json');
    const groupsList = await groupsListRes.json();
    const toPopulateSelect = document.getElementById('groupIndex');

    if (rodzajStudiow === 1) {
        var group = groupsList.stacjonarne[stopienStudiow];
        var option;

        for (var i = 0; i < group.length; i++) {
            option = document.createElement('option');
            option.appendChild(document.createTextNode(group[i]));
            toPopulateSelect.appendChild(option);
        }

    } else if (rodzajStudiow === 2) {
        var group = groupsList.niestacjonarne[stopienStudiow];
        var option;
        for (var i = 0; i < group.length; i++) {
            option = document.createElement('option');
            option.appendChild(document.createTextNode(group[i]));
            toPopulateSelect.appendChild(option);
        }
    } else {
        console.log("Wybrano wybrano");
    }

    wypelnijGrupe();
};

function redirectToCreatorGithub() {
    chrome.tabs.create({"url": "https://github.com/KajetanWarmbier"});
}