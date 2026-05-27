// 로컬스토리지에서 데이터 가져오기 (없으면 빈 배열)
let cartList = JSON.parse(localStorage.getItem("myCart")) || [];

// 페이지 켜지면 바로 실행
window.onload = function() {
    render();
};

// [할 일 입력 및 추가]
function addItem() {
    let input = document.querySelector("#item-input");
    let value = input.value.trim();

    if (value === "") {
        alert("내용을 입력하세요!");
        return;
    }

    // 객체 형태로 추가
    let item = { text: value, completed: false };
    cartList.push(item);

    // 저장 및 새로고침
    localStorage.setItem("myCart", JSON.stringify(cartList));
    input.value = ""; // 입력창 비우기
    render();
}

// 엔터키 입력 처리
function handleKeyDown(event) {
    if (event.key === "Enter") {
        addItem();
    }
}

// [화면 업데이트 - DOM 렌더링]
function render() {
    let listArea = document.querySelector("#cart-list");
    let htmlStr = "";

    // 가장 직관적인 기본 for문 사용
    for (let i = 0; i < cartList.length; i++) {
        let item = cartList[i];
        let className = item.completed ? "completed" : "";

        // 이모티콘 없이 텍스트만 깔끔하게 출력되도록 수정
        htmlStr += `
            <li>
                <span class="${className}" onclick="toggleItem(${i})">${item.text}</span>
                <div class="btn-group">
                    <button onclick="editItem(${i})">수정</button>
                    <button onclick="deleteItem(${i})">삭제</button>
                </div>
            </li>
        `;
    }
    listArea.innerHTML = htmlStr;
}

// [상태 변경 - 완료 토글]
function toggleItem(index) {
    cartList[index].completed = !cartList[index].completed;
    localStorage.setItem("myCart", JSON.stringify(cartList));
    render();
}

// [수정]
function editItem(index) {
    let newText = prompt("수정할 내용을 입력하세요:", cartList[index].text);
    if (newText !== null && newText.trim() !== "") {
        cartList[index].text = newText.trim();
        localStorage.setItem("myCart", JSON.stringify(cartList));
        render();
    }
}

// [삭제]
function deleteItem(index) {
    if (confirm("삭제하시겠습니까?")) {
        cartList.splice(index, 1); // splice로 해당 인덱스 한 개 지우기
        localStorage.setItem("myCart", JSON.stringify(cartList));
        render();
    }
}