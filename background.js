// onInstalled
browser.runtime.onInstalled.addListener(onInstalled);

function onInstalled() {
  browser.tabs.create({ url: "options.html" });
}

// popup.html click listener
chrome.runtime.onMessage.addListener(function (request) {
  switch (request.trigger) {
    case "openScheduleTab":
      openScheduleTab();
      break;
    case "openInfoTab":
      openInfoTab();
      break;
    case "openPortalTab":
      openPortalTab();
      break;
    case "openMdlTab":
      openMdlTab();
      break;
    case "openTeamsTab":
      openTeamsTab();
      break;
    case "openSettingsTab":
      browser.tabs.create({ url: "options.html" });
      break;
    default:
      break;
  }
});

// schedule

async function openScheduleTab() {
  await chrome.storage.sync.get(
    ["typeOfStudies", "degree", "groupIndex"],
    async function (scheduleValue) {
      if (scheduleValue.typeOfStudies === 1) {
        switch (scheduleValue.degree) {
          case 0:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
            });
            break;
          case 1:
            openSchedule(
              "https://wzr.ug.edu.pl/studia/index.php?str=437",
              scheduleValue.groupIndex
            );
            break;
          case 2:
            openSchedule(
              "https://wzr.ug.edu.pl/studia/index.php?str=480",
              scheduleValue.groupIndex
            );
            break;
          case 3:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/studia/index.php?str=1079",
            });
            break;
        }
      } else if (scheduleValue.typeOfStudies === 2) {
        switch (scheduleValue.degree) {
          case 0:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
            });
            break;
          case 1:
            openSchedule(
              "https://wzr.ug.edu.pl/studia/index.php?str=462",
              scheduleValue.groupIndex
            );
            break;
          case 2:
            openSchedule(
              "https://wzr.ug.edu.pl/studia/index.php?str=486",
              scheduleValue.groupIndex
            );
            break;
          case 3:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/studia/index.php?str=1078",
            });
            break;
        }
      } else {
        chrome.tabs.create({
          url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
        });
      }
    }
  );
}

async function openSchedule(scheduleSite, groupIndex) {
  browser.tabs.create({ url: scheduleSite }).then(() => {
    const openScheduleCode =
      `console.log(document.querySelector('select[name="f1"]').options[` +
      groupIndex +
      `].selected = true);
                  console.log(document.querySelector('select[name="f1"]').form.submit());`;
    browser.tabs.executeScript({
      code: openScheduleCode,
    });
  });
}

// Info

async function openInfoTab() {
  await chrome.storage.sync.get(
    ["typeOfStudies", "degree"],
    async function (infoValue) {
      if (infoValue.typeOfStudies === 1) {
        switch (infoValue.degree) {
          case 0:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
            });
            break;
          case 1:
            openInfo("https://wzr.ug.edu.pl/studia/index.php?str=438");
            break;
          case 2:
            openInfo("https://wzr.ug.edu.pl/studia/index.php?str=481");
            break;
          case 3:
            openInfo("https://wzr.ug.edu.pl/studia/index.php?str=1084");
            break;
        }
      } else if (infoValue.typeOfStudies === 2) {
        switch (infoValue.degree) {
          case 0:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
            });
            break;
          case 1:
            openInfo("https://wzr.ug.edu.pl/studia/index.php?str=463");
            break;
          case 2:
            openInfo("https://wzr.ug.edu.pl/studia/index.php?str=487");
            break;
          case 3:
            openInfo("https://wzr.ug.edu.pl/studia/index.php?str=493");
            break;
        }
      } else {
        chrome.tabs.create({
          url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
        });
      }
    }
  );
}

function openInfo(infoSite) {
  browser.tabs.create({ url: infoSite });
}

// Teams

async function openTeamsTab() {
  await chrome.storage.sync.get(
    ["groupIndex", "typeOfStudies", "degree"],
    async function (teamsValue) {
      if (teamsValue.typeOfStudies === 1) {
        switch (teamsValue.degree) {
          case 0:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
            });
            break;
          case 1:
            openTeams(
              "https://wzr.ug.edu.pl/studia/index.php?str=1878",
              teamsValue.groupIndex
            );
            break;
          case 2:
            openTeams(
              "https://wzr.ug.edu.pl/studia/index.php?str=1880",
              teamsValue.groupIndex
            );
            break;
          case 3:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/studia/index.php?str=1079",
            });
            break;
        }
      } else if (teamsValue.typeOfStudies === 2) {
        switch (teamsValue.degree) {
          case 0:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
            });
            break;
          case 1:
            openTeams(
              "https://wzr.ug.edu.pl/studia/index.php?str=1879",
              teamsValue.groupIndex
            );
            break;
          case 2:
            openTeams(
              "https://wzr.ug.edu.pl/studia/index.php?str=1881",
              teamsValue.groupIndex
            );
            break;
          case 3:
            chrome.tabs.create({
              url: "https://wzr.ug.edu.pl/studia/index.php?str=1078",
            });
            break;
        }
      } else {
        chrome.tabs.create({
          url: "https://wzr.ug.edu.pl/wydzial/index.php?str=461",
        });
      }
    }
  );
}

async function openTeams(teamsSite, groupIndex) {
  browser.tabs.create({ url: teamsSite }).then(() => {
    const openTeamsCode = `console.log(document.querySelector('select[name="grupa"]').options[${groupIndex}].selected = true);
                         console.log(document.querySelector('select[name="grupa"]').form.submit());`;
    browser.tabs.executeScript({
      code: openTeamsCode,
    });
  });
}

// Educational Portal

async function openMdlTab() {
  await chrome.storage.sync.get(["index"], async function (indexValue) {
    try {
      if (indexValue.index > 0) {
        openMdl(indexValue.index);
      } else {
        openMdl();
      }
    } catch (err) {
      console.log("Something went wrong.");
    }
  });
}

async function openMdl(indexValue) {
  browser.tabs
    .create({ url: "https://mdl.ug.edu.pl/login/index.php" })
    .then(() => {
      const openMdlCode = `console.log(document.querySelector('select[name="kimjestes"]').options[1].selected = true);
                           console.log(document.querySelector('input[name="username"]').value = ${indexValue});
                           console.log(document.querySelector('input[name="password"]').focus());`;
      browser.tabs.executeScript({
        code: openMdlCode,
      });
    });
}

// Student Portal

async function openPortalTab() {
  await chrome.storage.sync.get(["index"], async function (indexValue) {
    try {
      if (indexValue.index > 0) {
        openPortal(indexValue.index);
      } else {
        openPortal();
      }
    } catch (err) {
      console.error("Something went wrong.");
    }
  });
}

async function openPortal(indexValue) {
  browser.tabs.create({ url: "https://ps.ug.edu.pl/login.web" }).then(() => {
    const openPortalCode = `console.log(document.querySelector('select[name="licznik"]').options[0].selected = true);
                            console.log(document.querySelector('input[name="login"]').value = ${indexValue});
                            console.log(document.querySelector('input[name="pass"]').focus());`;
    browser.tabs.executeScript({
      code: openPortalCode,
    });
  });
}
