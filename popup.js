document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#planIcon').addEventListener('click', openPlanTab);
    document.querySelector('#infoIcon').addEventListener('click', openInfoTab);
    document.querySelector('#portalIcon').addEventListener('click', openPortalTab);
    document.querySelector('#mdlIcon').addEventListener('click', openMdlTab);
    document.querySelector('#teamIcon').addEventListener('click', openTeamsTab);
    document.querySelector('#settingsIcon').addEventListener('click', openSettingsTab);
});

function openPlanTab() {
    chrome.runtime.sendMessage({trigger: "openPlanTab"});
};

function openInfoTab() {
    chrome.runtime.sendMessage({trigger: "openInfoTab"});
};

function openPortalTab() {
    chrome.runtime.sendMessage({trigger: "openPortalTab"})
};

function openMdlTab() {
    chrome.runtime.sendMessage({trigger: "openMdlTab"})
};

function openTeamsTab() {
    chrome.runtime.sendMessage({trigger: "openTeamsTab"})
};

function openSettingsTab() {
    chrome.runtime.sendMessage({trigger: "openSettingsTab"})
};