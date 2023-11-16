"use strict";

const stuffData = {
  firstName: "John",
  secondName: "Smith",
  age: 42,
  gender: "male",
  role: "CEO",
  yearsOfExperience: 1,
  inCompanySince: "03 Aug 2005",
  subordinators: [
    {
      firstName: "Jane",
      secondName: "Clark",
      age: 34,
      gender: "female",
      role: "Chief HR officer",
      yearsOfExperience: 12,
      inCompanySince: "12 May 2017",
      subordinators: [
        {
          firstName: "Ferenz",
          secondName: "Derd",
          age: 27,
          gender: "male",
          role: "Senior HR manager",
          yearsOfExperience: 7,
          inCompanySince: "15 Oct 2019",
          subordinators: [
            {
              firstName: "Gregor",
              secondName: "Bur",
              age: 26,
              gender: "male",
              role: "Middle HR manager",
              yearsOfExperience: 7,
              inCompanySince: "22 Apr 2020",
              subordinators: [
                {
                  firstName: "Caleb",
                  secondName: "Ottvik",
                  age: 24,
                  gender: "male",
                  role: "Junior HR manager",
                  yearsOfExperience: 7,
                  inCompanySince: "04 Jun 2020",
                  subordinators: null,
                },
                {
                  firstName: "Peri",
                  secondName: "Hafar",
                  age: 22,
                  gender: "female",
                  role: "Junior HR manager",
                  yearsOfExperience: 7,
                  inCompanySince: "18 Dec 2021",
                  subordinators: null,
                },
              ],
            },
          ],
        },
        {
          firstName: "Syenn",
          secondName: "Gungvind",
          age: 38,
          gender: "female",
          role: "Senior HR manager",
          yearsOfExperience: 15,
          inCompanySince: "12 May 2012",
          subordinators: [
            {
              firstName: "Enos",
              secondName: "Zey",
              age: 30,
              gender: "male",
              role: "Middle HR manager",
              yearsOfExperience: 5,
              inCompanySince: "18 Dec 2020",
              subordinators: [
                {
                  firstName: "Caleb",
                  secondName: "Ottvik",
                  age: 24,
                  gender: "male",
                  role: "Junior HR manager",
                  yearsOfExperience: 7,
                  inCompanySince: "04 Jun 2020",
                  subordinators: null,
                },
              ],
            },
            {
              firstName: "Caleb",
              secondName: "Ottvik",
              age: 24,
              gender: "male",
              role: "Junior HR manager",
              yearsOfExperience: 7,
              inCompanySince: "04 Jun 2020",
              subordinators: null,
            },
            {
              firstName: "Peri",
              secondName: "Hafar",
              age: 22,
              gender: "female",
              role: "Junior HR manager",
              yearsOfExperience: 7,
              inCompanySince: "18 Dec 2021",
              subordinators: null,
            },
          ],
        },
        {
          firstName: "Enos",
          secondName: "Zey",
          age: 30,
          gender: "male",
          role: "Middle HR manager",
          yearsOfExperience: 5,
          inCompanySince: "18 Dec 2020",
          subordinators: [
            {
              firstName: "Caleb",
              secondName: "Ottvik",
              age: 24,
              gender: "male",
              role: "Junior HR manager",
              yearsOfExperience: 7,
              inCompanySince: "04 Jun 2020",
              subordinators: null,
            },
          ],
        },
        {
          firstName: "Gregor",
          secondName: "Bur",
          age: 26,
          gender: "male",
          role: "Middle HR manager",
          yearsOfExperience: 7,
          inCompanySince: "22 Apr 2020",
          subordinators: [
            {
              firstName: "Caleb",
              secondName: "Ottvik",
              age: 24,
              gender: "male",
              role: "Junior HR manager",
              yearsOfExperience: 7,
              inCompanySince: "04 Jun 2020",
              subordinators: null,
            },
            {
              firstName: "Peri",
              secondName: "Hafar",
              age: 22,
              gender: "female",
              role: "Junior HR manager",
              yearsOfExperience: 7,
              inCompanySince: "18 Dec 2021",
              subordinators: null,
            },
          ],
        },
        {
          firstName: "Caleb",
          secondName: "Ottvik",
          age: 24,
          gender: "male",
          role: "Junior HR manager",
          yearsOfExperience: 7,
          inCompanySince: "04 Jun 2020",
          subordinators: null,
        },
        {
          firstName: "Peri",
          secondName: "Hafar",
          age: 22,
          gender: "female",
          role: "Junior HR manager",
          yearsOfExperience: 7,
          inCompanySince: "18 Dec 2021",
          subordinators: null,
        },
      ],
    },
    {
      firstName: "Olga",
      secondName: "Petrenko",
      age: 31,
      gender: "female",
      role: "CTO",
      yearsOfExperience: 12,
      inCompanySince: "15 Apr 2019",
      subordinators: [
        {
          firstName: "Peter",
          secondName: "Barton",
          age: 29,
          gender: "male",
          role: "JS competence manager",
          yearsOfExperience: 11,
          inCompanySince: "01 Feb 2020",
          subordinators: null,
        },
      ],
    },
    {
      firstName: "Jack",
      secondName: "Black",
      age: 45,
      gender: "male",
      role: "Office manager",
      yearsOfExperience: 20,
      inCompanySince: "24 Apr 2016",
      subordinators: null,
    },
  ],
};

/**
 * План
 * 1. Дістати всі вложені об'єкти
 * 2. відфільтрувати працівників
 * 3. посортувати працівників
 * 4. відобразити інформацію по кожному працівнику
 */

function parssingStuff(workersData, property) {
  let workersArray = [];
  flatStuff(workersData, workersArray);
  const uniqueWorkers = filterUniqueWorker(workersArray);
  const sortedWorkers = [...uniqueWorkers].sort(sortWorkers(property));

  displayWorkers(sortedWorkers);
}

function flatStuff(stuffStructure, workersArray) {
  workersArray.push(stuffStructure);

  if (stuffStructure.subordinators === null) {
    return null;
  }

  stuffStructure.subordinators.forEach(subordinator => {
    flatStuff(subordinator, workersArray);
  })
}

function filterUniqueWorker(workers) {
  const preparedWorkerForMap = workers.map((worker) => {
    return [`${worker.firstName} ${worker.secondName}`, worker];
  });

  const workersMap = new Map(preparedWorkerForMap);
  const workersValues = workersMap.values();
  const newArr = [...workersValues];

  return newArr;
}

// альтернативний варіант фільтрації

// function filterUniqueWorker(workers) {
//   const uniqueArr = [];

//   const filteredWorkers = workers.filter((worker) => {
//     const key = worker.firstName + " " + worker.secondName;

//     if (!uniqueArr.includes(key)) {
//       uniqueArr.push(key);
//       return true;
//     }
//   });

//   return filteredWorkers;
// }

function sortWorkers(property = 'age') {
  return (workerA, workerB) => workerA[property] < workerB[property] ? 1 : -1;
}

function getYears(years) {
  return years > 1 ? 'years' : 'year';
}

function displayWorkers(workers) {
  workers.forEach((worker) => {
    const duration = Math.floor(
      (new Date() - new Date(worker.inCompanySince)) / 1000 / 31536000
    );

    const workerFullName = `${worker.firstName} ${worker.secondName}`;

    const workerInfo = `
        ${workerFullName} as a ${worker.role}, has ${
      worker.yearsOfExperience
    } ${getYears(worker.yearsOfExperience)} of experience and works ${duration} 
        ${getYears(duration)} in the company.`;

    console.log(workerInfo);
  });
}

parssingStuff(stuffData, 'firstName');
