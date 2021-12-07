//---onInstalledFunc------------------------------------------------------------------------------------
browser.runtime.onInstalled.addListener(onInstalledFunc);

function onInstalledFunc() {
  browser.tabs.create({"url": "options.html"});
}

//---popup.html click listener--------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.trigger) {
    case 'openPlanTab':
      openPlan();
      break;
    case 'openInfoTab':
      openInfoTab();
      break;
    case 'openPortalTab':
      openPortal();
      break;
    case 'openMdlTab':
      openMdl();
      break;
    case 'openTeamsTab':
      openTeams();
      break;
    case 'openSettingsTab':
      browser.tabs.create({"url": "options.html"})
      break;
  }
});

//---Plan Zajec----------------------------------------------------------------------------------------

async function openPlan() {
  await chrome.storage.sync.get(['studiaRodzaj', 'studiaStopien', 'groupIndex'], async function(planValue) {
    if (planValue.studiaRodzaj === 1) {
      switch (planValue.studiaStopien) {
        case 0:
          chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
          break;
        case 1:
          openPlanFunc("https://wzr.ug.edu.pl/studia/index.php?str=437", planValue.groupIndex);
          break;
        case 2:
          openPlanFunc("https://wzr.ug.edu.pl/studia/index.php?str=480", planValue.groupIndex);
          break;
        case 3:
          chrome.tabs.create({"url": "https://wzr.ug.edu.pl/studia/index.php?str=1079"});
          break;
      };
    } else if (planValue.studiaRodzaj === 2) {
      switch (planValue.studiaStopien) {
        case 0:
          chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
          break;
        case 1:
          openPlanFunc("https://wzr.ug.edu.pl/studia/index.php?str=462", planValue.groupIndex);
          break;
        case 2:
          openPlanFunc("https://wzr.ug.edu.pl/studia/index.php?str=486", planValue.groupIndex);
          break;
        case 3:
          chrome.tabs.create({"url": "https://wzr.ug.edu.pl/studia/index.php?str=1078"});
          break;
      };
    } else {
      chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
    };
  });
};

async function openPlanFunc(planStrona, groupInd) {
  browser.tabs.create({"url": planStrona}).then(() => {
    var planFuncCode = `console.log(document.querySelector('select[name="f1"]').options[` + groupInd + `].selected = true);
                  console.log(document.querySelector('select[name="f1"]').form.submit());`;
    browser.tabs.executeScript({
      code: planFuncCode
    });
  });
};

//--Ogloszenia-----------------------------------------------------------------------------------------

async function openInfoTab() {
  await chrome.storage.sync.get(['studiaRodzaj', 'studiaStopien'], async function(infoValue) {
    if (infoValue.studiaRodzaj === 1) {
      switch (infoValue.studiaStopien) {
        case 0:
          chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
          break;
        case 1:
          openInfoTabFunc("https://wzr.ug.edu.pl/studia/index.php?str=438");
          break;
        case 2:
          openInfoTabFunc("https://wzr.ug.edu.pl/studia/index.php?str=481");
          break;
        case 3:
          openInfoTabFunc("https://wzr.ug.edu.pl/studia/index.php?str=1084");
          break;
      };
    } else if (infoValue.studiaRodzaj === 2) {
      switch (infoValue.studiaStopien) {
        case 0:
          chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
          break;
        case 1:
          openInfoTabFunc("https://wzr.ug.edu.pl/studia/index.php?str=463");
          break;
        case 2:
          openInfoTabFunc("https://wzr.ug.edu.pl/studia/index.php?str=487");
          break;
        case 3:
          openInfoTabFunc("https://wzr.ug.edu.pl/studia/index.php?str=493");
          break;
      };
    } else {
      chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
    };
  });
};


function openInfoTabFunc(ogloszeniaStrona) {
  browser.tabs.create({"url": ogloszeniaStrona})
};

//---Teams---------------------------------------------------------------------------------------------

async function openTeams() {
  await chrome.storage.sync.get(['groupIndex', 'studiaRodzaj', 'studiaStopien'], async function(teamsValue) {
    
        if (teamsValue.studiaRodzaj === 1) {
          switch (teamsValue.studiaStopien) {
            case 0:
              chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
              break;
            case 1:
              openTeamsFunc("https://wzr.ug.edu.pl/studia/index.php?str=1878", teamsValue.groupIndex);
              break;
            case 2:
              openTeamsFunc("https://wzr.ug.edu.pl/studia/index.php?str=1880", teamsValue.groupIndex);
              break;
            case 3:
              chrome.tabs.create({"url": "https://wzr.ug.edu.pl/studia/index.php?str=1079"});
              break;
          };

        } else if (teamsValue.studiaRodzaj === 2) {
          switch (teamsValue.studiaStopien) {
            case 0:
              chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
              break;
            case 1:
              openTeamsFunc("https://wzr.ug.edu.pl/studia/index.php?str=1879", teamsValue.groupIndex);
              break;
            case 2:
              openTeamsFunc("https://wzr.ug.edu.pl/studia/index.php?str=1881", teamsValue.groupIndex);
              break;
            case 3:
              chrome.tabs.create({"url": "https://wzr.ug.edu.pl/studia/index.php?str=1078"});
              break;
          };
        }  else {
          chrome.tabs.create({"url": "https://wzr.ug.edu.pl/wydzial/index.php?str=461"});
        };        
  });
};

async function openTeamsFunc(teamsStrona, groupInd) {
  browser.tabs.create({"url": teamsStrona}).then(() => {
    var teamsFuncCode = `console.log(document.querySelector('select[name="grupa"]').options[${groupInd}].selected = true);
                         console.log(document.querySelector('select[name="grupa"]').form.submit());`;
    browser.tabs.executeScript({
      code: teamsFuncCode
    });
  });
};

//---Portal Edukacyjny---------------------------------------------------------------------------------

async function openMdl() {
  await chrome.storage.sync.get(['index'], async function(indValue) {
    try {
      if (indValue.index > 0) {
        openMdlFunc(indValue.index);
      } else {
        openMdlFunc();
      }
    } catch (err) {
      console.log("Something went wrong.")
    };
  });
};

async function openMdlFunc(indValue) {
  browser.tabs.create({"url": "https://mdl.ug.edu.pl/login/index.php"}).then(() => {
    var mdlFuncCode = `console.log(document.querySelector('select[name="kimjestes"]').options[1].selected = true);
                         console.log(document.querySelector('input[name="username"]').value = ${indValue});
                         console.log(document.querySelector('input[name="password"]').focus());`;
    browser.tabs.executeScript({
      code: mdlFuncCode
    });
  });
};

//---Portal Studenta-----------------------------------------------------------------------------------

async function openPortal() {
  await chrome.storage.sync.get(['index'], async function(indValue) {
    try {
      if (indValue.index > 0) {
        openPortalFunc(indValue.index);
      } else {
        openPortalFunc();
      }
    } catch (err) {
      console.log("Something went wrong.")
    };
  });
};

async function openPortalFunc(indValue) {
  browser.tabs.create({"url": "https://ps.ug.edu.pl/login.web"}).then(() => {
    var portalFuncCode = `console.log(document.querySelector('select[name="licznik"]').options[0].selected = true);
                         console.log(document.querySelector('input[name="login"]').value = ${indValue});
                         console.log(document.querySelector('input[name="pass"]').focus());`;
    browser.tabs.executeScript({
      code: portalFuncCode
    });
  });
};