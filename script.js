$(document).ready(function () {
  const apiURL = "http://lab.vntu.org/api-server/lab7.php";

  // Function to load data from API
  function loadData(sortBy = null) {
    $.ajax({
      url: apiURL,
      method: "GET",
      dataType: "json", // Expect JSON data
      success: function (data) {
        // Check if the response is in the expected format
        if (Array.isArray(data)) {
          if (sortBy) {
            data.sort((a, b) => {
              if (a[sortBy] < b[sortBy]) return -1;
              if (a[sortBy] > b[sortBy]) return 1;
              return 0;
            });
          }

          // Populate the table
          const tbody = $("#data-table tbody");
          tbody.empty(); // Clear old rows

          data.forEach((item) => {
            tbody.append(`
              <tr>
                <td>${item.name}</td>
                <td>${item.affiliation}</td>
              </tr>
            `);
          });
        } else {
          console.error("Unexpected API response format:", data);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data:", status, error);
        alert("Failed to load data. Check the console for more details.");
      },
    });
  }

  // Load data initially
  loadData();

  // Refresh data on button click
  $("#refresh").on("click", function () {
    loadData();
  });

  // Sort data on table header click
  $("th").on("click", function () {
    const sortBy = $(this).data("sort");
    loadData(sortBy);
  });
});
