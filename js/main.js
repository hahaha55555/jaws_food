$(document).ready(function () {
  const itemWidth = 212 + 178;
  const visibleCount = 4;
  let currentIndex = visibleCount;
  let $currentList;

  function setupLoop($list) {
    const $items = $list.children();
    const $cloneFirst = $items.slice(0, visibleCount).clone();
    const $cloneLast = $items.slice(-visibleCount).clone();

    $list.prepend($cloneLast);
    $list.append($cloneFirst);
    $list.css("width", itemWidth * $list.children().length + "px");
    $list.css("transform", `translateX(${-itemWidth * currentIndex}px)`);
  }

  function slideTo(index) {
    $currentList.css("transition", "transform 0.5s ease");
    $currentList.css("transform", `translateX(${-itemWidth * index}px)`);
  }

  function resetPosition(newIndex) {
    setTimeout(() => {
      $currentList.css("transition", "none");
      $currentList.css("transform", `translateX(${-itemWidth * newIndex}px)`);
      currentIndex = newIndex;
    }, 510);
  }

  function initSlider(selector) {
    $currentList = $(selector);
    setupLoop($currentList);
  }

  // 탭 클릭
  $(".mainM").on("click", function () {
    $(".content").removeClass("on");
    $(".main_menu").addClass("on");
    $(".prev, .next").removeClass("hide");
    initSlider(".main_menu");
  });

  $(".setM").on("click", function () {
    $(".content").removeClass("on");
    $(".set_menu").addClass("on");
    $(".prev, .next").addClass("hide");
  });

  $(".sideM").on("click", function () {
    $(".content").removeClass("on");
    $(".side_menu").addClass("on");
    $(".prev, .next").removeClass("hide");
    initSlider(".side_menu");
  });

  // 초기 실행
  initSlider(".main_menu");
  $(".main_menu").addClass("on");

  // 슬라이드 버튼
  $(".next").on("click", function () {
    currentIndex++;
    slideTo(currentIndex);
    if (currentIndex === $currentList.children().length - visibleCount) {
      resetPosition(visibleCount);
    }
  });

  $(".prev").on("click", function () {
    currentIndex--;
    slideTo(currentIndex);
    if (currentIndex === 0) {
      resetPosition($currentList.children().length - visibleCount * 2);
    }
  });

  // 인포박스
  $(document).on("click", "#menuSlide .menuItem", function () {
    $(".menuItem").removeClass("active");
    $(this).addClass("active");

    const name = $(this).data("name");
    const sub = $(this).data("sub");
    const desc1 = $(this).data("desc1");
    const desc2 = $(this).data("desc2");
    const img = $(this).data("img");
    const side1 = $(this).data("side1");
    const side2 = $(this).data("side2");

    $(".menuImg").attr("src", img);
    $(".Name").text(name);
    $(".sub").text(sub);
    $(".desc1").text(desc1);
    $(".desc2").text(desc2);
    $(".side1").attr("src", side1);
    $(".side2").attr("src", side2);
  });
});
