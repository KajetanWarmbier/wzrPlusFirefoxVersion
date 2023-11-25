document.addEventListener("DOMContentLoaded", () => {
  async function fillInTheFIelds() {
    await chrome.storage.sync.get(
      ["typeOfStudies"],
      function (typeOfStudiesValue) {
        if (typeOfStudiesValue.typeOfStudies.length) {
          document.querySelector('select[name="typeOfStudies"]').options[
            typeOfStudiesValue.typeOfStudies
          ].selected = true;

          chrome.storage.sync.get(["degree"], function (degreeValue) {
            if (degreeValue.degree.length) {
              document.querySelector('select[name="degree"]').options[
                degreeValue.degree
              ].selected = true;

              if (typeOfStudiesValue.typeOfStudies === 1) {
                switch (degreeValue.degree) {
                  case 1:
                    populateGroup(1, "firstDegree");
                    break;
                  case 2:
                    populateGroup(1, "secondDegree");
                    break;
                  case 3:
                    populateGroup(1, "thirdDegree");
                    break;
                }
              } else if (typeOfStudiesValue.typeOfStudies === 2) {
                switch (degreeValue.degree) {
                  case 1:
                    populateGroup(2, "firstDegree");
                    break;
                  case 2:
                    populateGroup(2, "secondDegree");
                    break;
                  case 3:
                    populateGroup(2, "thirdDegree");
                    break;
                }
              }
            } else {
              document.querySelector(
                'select[name="groupIndex"]'
              ).disabled = true;
            }
          });
        } else {
          document.querySelector('select[name="degree"]').disabled = true;
        }
      }
    );
  }

  fillInTheFIelds();

  chrome.storage.sync.get(["index"], function (indexValue) {
    if (indexValue.index.length) {
      document.querySelector("#indexValueId").value = indexValue.index;
    }
  });
});

document.querySelector("#submitBtn").addEventListener("click", initializeData);
document
  .querySelector("#typeOfStudies")
  .addEventListener("change", selectTypeOfStudies);
document.querySelector("#degree").addEventListener("change", selectDegree);
document
  .querySelector("#creator")
  .addEventListener("click", redirectToCreatorGithub);

function initializeData() {
  const groupIndex = document.querySelector(
    'select[name="groupIndex"]'
  ).selectedIndex;
  chrome.storage.sync.set({ groupIndex: groupIndex });

  const typeOfStudiesValue = document.querySelector(
    'select[name="typeOfStudies"]'
  ).selectedIndex;
  chrome.storage.sync.set({ typeOfStudies: typeOfStudiesValue });

  const degreeValue = document.querySelector(
    'select[name="degree"]'
  ).selectedIndex;
  chrome.storage.sync.set({ degree: degreeValue });

  if (indexField.length && indexField.match(/^\d+$/)) {
    const indexValue = document.querySelector("#indexValueId").value;
    chrome.storage.sync.set({ index: indexValue });
  }

  alert("Zapisano informacje.");
}

function selectTypeOfStudies() {
  document.querySelector('select[name="degree"]').options[0].selected = true;

  selectDegree();

  const typeOfStudiesIndex = document.querySelector(
    'select[name="typeOfStudies"]'
  ).selectedIndex;

  if (typeOfStudiesIndex !== 0) {
    document.querySelector('select[name="degree"]').disabled = false;
  } else {
    document.querySelector('select[name="degree"]').disabled = true;
  }
}

async function selectDegree() {
  document.getElementById("groupIndex").replaceChildren();

  const degreeIndex = document.querySelector(
    'select[name="degree"]'
  ).selectedIndex;

  const typeOfStudiesIndex = document.querySelector(
    'select[name="typeOfStudies"]'
  ).selectedIndex;

  if (degreeIndex !== 0) {
    document.querySelector('select[name="groupIndex"]').disabled = false;
  } else {
    document.querySelector('select[name="groupIndex"]').disabled = true;
    document.querySelector('select[name="groupIndex"]').value = "Wybierz";
  }

  switch (degreeIndex) {
    case 0:
      break;
    case 1:
      populateGroup(typeOfStudiesIndex, "firstDegree");
      break;
    case 2:
      populateGroup(typeOfStudiesIndex, "secondDegree");
      break;
    case 3:
      populateGroup(typeOfStudiesIndex, "thirdDegree");
      break;
    default:
      break;
  }
}

function fillInGroup() {
  chrome.storage.sync.get(["groupIndex"], function (groupValue) {
    try {
      document.querySelector('select[name="groupIndex"]').options[
        groupValue.groupIndex
      ].selected = true;
    } catch (err) {
      console.error(
        "Nothing to worry about. Just a weird way to omit the error."
      );
    }
  });
}

async function populateGroup(typeOfStudies, degree) {
  const groupsList = await fetch(
    "https://raw.githubusercontent.com/KajetanWarmbier/wzrPlus/main/groupsList.json"
  ).then((groupsListRes) => {
    return groupsListRes.json();
  });

  const toPopulateSelect = document.getElementById("groupIndex");

  if (typeOfStudies === 1) {
    const group = groupsList.stacjonarne[degree];
    const option = document.createElement("option");

    for (let i = 0; i < group.length; i++) {
      option.appendChild(document.createTextNode(group[i]));
      toPopulateSelect.appendChild(option);
    }
  } else if (typeOfStudies === 2) {
    const group = groupsList.niestacjonarne[degree];
    const option = document.createElement("option");

    for (let i = 0; i < group.length; i++) {
      option.appendChild(document.createTextNode(group[i]));
      toPopulateSelect.appendChild(option);
    }
  }

  fillInGroup();
}

function redirectToCreatorGithub() {
  chrome.tabs.create({ url: "https://github.com/KajetanWarmbier" });
}
