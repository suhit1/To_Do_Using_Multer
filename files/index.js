const text = document.getElementById("text");
const file = document.getElementById("file");
const btn = document.getElementById("btn");
const todolist = document.getElementById("todolist");

function fetchdata() {
  // making ajax call to server;
  const request = new XMLHttpRequest();

  request.open("GET", "/getdata");
  request.send();

  request.addEventListener("load", function () {
    // console.log(JSON.parse(request.responseText));
    if (request.status === 200) {
      let arr = JSON.parse(request.responseText);
      arr.forEach((element) => {
        let inner_div = document.createElement("div");

        inner_div.className = "inner_div";

        let h3 = document.createElement("h3");
        h3.innerText = element.task;
        h3.className = "all";

        let img = document.createElement("img");
        img.src = "./public/" + element.image;
        img.className = "img";
        // img.className = "all";

        let chechkbox = document.createElement("input");
        chechkbox.type = "checkbox";
        chechkbox.className = "all";

        // to create strike through means you have done this task
        chechkbox.addEventListener("click", function () {
          let strike = document.createElement("strike");
          strike.innerText = h3.innerText;
          h3.innerText = "";
          h3.appendChild(strike);
        });

        let btn = document.createElement("button");
        btn.innerText = "🗑️";
        btn.className = "btn";
        btn.className = "all";

        // to delete this task
        btn.addEventListener("click", function () {
          todolist.removeChild(inner_div);
          let request = new XMLHttpRequest();
          request.open("POST", "/update");
          request.setRequestHeader("Content-Type", "application/json");
          request.send(JSON.stringify({ task: h3.innerText }));
          console.log(h3.innerText);
        });

        inner_div.appendChild(h3);
        inner_div.appendChild(img);
        inner_div.appendChild(chechkbox);
        inner_div.appendChild(btn);

        todolist.appendChild(inner_div);
      });
    }
  });
}
fetchdata();
