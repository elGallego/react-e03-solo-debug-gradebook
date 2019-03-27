const datas = {
  name: 'Parker Lewis',
  classroom: 'Eleventh grade',
  grades: [
    {
      name: 'Mathematics',
      coeff: 7,
      grade: 9,
    },
    {
      name: 'French writing',
      coeff: 3,
      grade: 5,
    },
    {
      name: 'English literature',
      coeff: 4,
      grade: 11,
    },
    {
      name: 'Physical Education',
      coeff: 2,
      grade: 14,
    },
    {
      name: 'Ancient history',
      coeff: 5,
      grade: 6,
    },
    {
      name: 'JavaScript',
      coeff: 3,
      grade: 18,
    },
  ],
};

const app = {
  /**
   * DOM loading
   */
  init: function() {
    app.gradebook = document.getElementById('gradebook');
    app.create();
  },

  /**
   * DOM generation
   */
  create: function() {
    // Create
    app.createTable();
    app.createRows();
    app.createAverage();

    // Append to DOM
    app.gradebook.appendChild(app.table);
  },

  /**
   * Create table + caption
   */
  createTable: function() {
    app.table = document.createElement('table');

    // Caption
    const caption = document.createElement('caption');
    caption.textContent = `${datas.name} - ${datas.classroom}`;
    app.table.appendChild(caption);
  },

  /**
   * Create grade rows
   */
  createRows: function() {
    // Creating row for each fields
    datas.grades.forEach((grade) => {
      const row = document.createElement('tr');

      /* Name */
      const cellName = document.createElement('td');
      cellName.textContent = grade.name;
      row.appendChild(cellName);

      /* Coeff*/
      // Td
      const cellCoeff = document.createElement('td');

      // Input
      let inputCoeff = document.createElement('input');
      inputCoeff.value = grade.coeff;
      inputCoeff.maxLength = 1;
      inputCoeff.addEventListener('change', function() {
        grade.coeff = Number(inputCoeff.value);
        app.create();
      });

      // Append
      cellCoeff.appendChild(inputCoeff);
      row.appendChild(cellCoeff);

      /* Grade */
      // Td
      const cellGrade = document.createElement('td');

      // Input
      let inputGrade = document.createElement('input');
      inputGrade.value = grade.grade;
      inputGrade.maxLength = 2;
      inputGrade.addEventListener('change', function() {
        grade.grade = Number(inputGrade.value);
        app.create();
      });

      // Span
      const span = document.createElement('span');
      span.textContent = ' / 20';

      // Append
      cellGrade.appendChild(inputGrade);
      cellGrade.appendChild(span);
      row.appendChild(cellGrade);

      /* Append row */
      app.table.appendChild(row);
    });
  },

  /**
   * Create average row
   */
  createAverage: function() {
    // Row
    const row = document.createElement('tr');
    row.id = 'gradebook-average';

    // Title
    const titleCell = document.createElement('th');
    titleCell.textContent = 'Average';
    row.appendChild(titleCell);

    /* Average */
    // Cell
    const averageCell = document.createElement('td');
    averageCell.rowSpan = 2;

    // Cumul
    // One Reduce To Rule Them All.
    const cumulObj = datas.grades.reduce((cumul, grade) => ({
      grade: cumul.grade + grade.grade * grade.coeff,
      coeff: cumul.coeff + grade.coeff,
    }), 0);

    // Average, with 2 decimals
    const average = Math.round(cumulObj.grade / cumulObj.coeff * 100) / 100;
    averageCell.textContent = average;

    /* Append */
    // Append cell
    row.appendChild(averageCell);

    // Append row
    row.className = average > 10 ? 'error' : 'success';
    app.table.appendChild(row);
  },
};

document.addEventListener('DOMContentLoaded', app);
