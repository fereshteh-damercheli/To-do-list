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
            "boxShadow": "none",
        })
        $('section.taskTitle>span.error').fadeIn()
    }

}).on('input', function () {
    if ($(this).val().trim() !== "") {
        $(this).css({
            "border": "none",
            "boxShadow": "none",
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
        updateProgress()

    } else if ($('select').val() === "medium") {
        $('section.showTasks').append(`<li class="task"><span class="midPro">medium</span>${inputValue}
<button class="done"><i class="fa-solid fa-check"></i> Done</button><button class="delete"><i class="fa-solid fa-trash-can"></i></button>
</li>`)
        $('input[type=text]').val("")
        updateProgress()

    } else {
        $('section.showTasks').append(`<li class="task">
<span class="lowPro">low</span>${inputValue}
<button class="done">
<i class="fa-solid fa-check"></i> Done
</button>
<button class="delete">
<i class="fa-solid fa-trash-can"></i></button>
</li>`)
        $('input[type=text]').val("")
        updateProgress()

    }




})
$("section.showTasks").on("click",".done", function () {
    let li = $(this).closest('li');
    if (li.hasClass('completed')) {
        li.removeClass('completed')
        li.fadeTo(300, 1)
        $(this).css({
            "backgroundColor": "white",
            "color": "#68A691",
        })
        $(this).find('i').css({
            'color': '#68A691',
        })
    } else {
        li.addClass('completed')
        $(this).parent().fadeTo(300, 0.4)
        $(this).css({
            "backgroundColor": "#68A691",
            "color": "white",
        })
        $(this).find('i').css({
            'color': 'white',
        })
    }
    updateProgress()

})
$(".showTasks").on("click",".delete" ,function () {
    $(this).css({
        'font-size': '14px',
    })
    $(this).parent().fadeOut(300, function () {
        $(this).remove()
        updateProgress()
    })
})
$('section.showTasks').on('mouseenter', '.task', function () {
    $(this).css({
        // 'border': '1px solid #FFE5D4',
        'background-color': '#eeeeee',
        'transition': 'all 200ms linear',

    }).find('.delete').css({
        'backgroundColor': '#eeeeee',
        'transition': 'all 200ms linear',

    })
}).on('mouseleave', '.task', function () {
    $(this).css({
        'background-color': 'white',
    }).find('.delete').css({
        'backgroundColor': 'white',
        'transition': 'all 200ms linear',
    })
})
let updateProgress = () => {
    let total = $('.task').length
    let done = $('.completed').length
    let percent = (total === 0) ? 0 : Math.round(done / total * 100)

    $('.progress-bar').stop().animate({
        width: percent + "%",
    }, 500)
    $('.progressText').text(done + " of " + total + " done (" + percent + "% )")
}
updateProgress()








