$("input").on("focus", function () {
    $(this).css({
            "border": "none",
            "boxShadow": "10px 10px 10px #FFE5D4",
            "background-color": "##FFE5D4",

        }
    )
}).on("blur", function () {
    if ($(this).val().trim() === "") {
        $(this).css({
            "border": "2px solid brown",
        })
        $('section.taskTitle>span.error').fadeIn()
    }

}).on('input', function () {
    if ($(this).val().trim() !== "") {
        $(this).css({
            "border": "none",
        })
        $('section.taskTitle>span.error').remove();
    }
})
$('section.addTask>button').on("click", function () {
    let inputValue = $('input').val();
    $(this).addClass("active")
    setTimeout(function () {
        $('button').removeClass("active")
    }, 300)
    if (inputValue === "") {
        $('input[type=text]').css({
            "border": "2px solid brown",
        })
        $('section.taskTitle>span.error').fadeIn()

    } else if ($('select').val() === "high") {
        $('section.showTasks').prepend(`<li class="task"><span class="highPro">High</span>${inputValue}
<button class="done"><i class="fa-solid fa-check"></i> Done</button><button class="delete"><i class="fa-solid fa-trash-can"></i></button>
</li>`)
        $('input[type=text]').val("")
    }else if ($('select').val() === "medium") {
        $('section.showTasks').append(`<li class="task"><span class="midPro">medium</span>${inputValue}

</li>`)
        $('input[type=text]').val("")
    }else {
        $('section.showTasks').append(`<li class="task"><span class="lowPro">low</span>${inputValue}</li>`)
        $('input[type=text]').val("")
    }
})

