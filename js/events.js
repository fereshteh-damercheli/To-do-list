$("input").on("focus", function () {
    $(this).css({
            "border": "none",
            // "boxShadow": "10px 10px 10px #FFE5D4",
            // "background-color": "",
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
            "border": "2px solid white",
            "boxShadow": "none",
        })
        $('section.taskTitle>span.error').fadeOut();
    }
})
// Add task click handler
$('section.addTask>button').on("click", function () {
    let input = $('input[type=text]')
// events for appearance os button
    let btn = $(this)
    btn.addClass("active")
    setTimeout(function () {
        btn.removeClass("active")
    }, 250)

    let inputValue = input.val().trim(); //make input box empty after click and add task


    if (inputValue === "") {
        input.css({
            "border": "2px solid brown",
        })
        $('section.taskTitle>span.error').fadeIn()
    }

    let priority = $('select').val()      // high | medium | low
    let li = $(`<li class="task">
        <span class="${priority}Pro">${priority}</span>
        <span class="title"></span>
        <button class="done"><i class="fa-solid fa-check"></i> Done</button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </li>`).hide()

    li.find('.title').text(inputValue)

    if (priority === 'high') $('section.showTasks').prepend(li)
    else $('section.showTasks').append(li)

    li.fadeIn(300)
    input.val('')
    updateProgress()
})


$("section.showTasks").on("click", ".done", function () {
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
$(".showTasks").on("click", ".delete", function () {
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
        'background-color': 'var(--hover)',
        'transition': 'all 200ms linear',

    }).find('.delete').css({
        'backgroundColor': 'var(--hover)',
        'transition': 'all 200ms linear',

    })
}).on('mouseleave', '.task', function () {
    $(this).css({
        'background-color': 'var(--background)',
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
    $('.progressText').text(done + " of " + total + " done (" + percent + "%)")
}
updateProgress()








