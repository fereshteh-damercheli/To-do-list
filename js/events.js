
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

    let inputValue = input.val().trim();


    if (inputValue === "") {
        input.css({
            "border": "2px solid brown",
        })
        $('section.taskTitle>span.error').fadeIn()
        return
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
    saveTasks()
})


$("section.showTasks").on("click", ".done", function () {
    let li = $(this).closest('li');
    if (li.hasClass('completed')) {
        li.removeClass('completed')
        li.fadeTo(300, 1)
        $(this).css({
            "backgroundColor": "white",
            "color": "var(--text-color)",
        })
        $(this).find('i').css({
            'color': 'var(--text-color)',
        })
    } else {
        li.addClass('completed')
        $(this).parent().fadeTo(300, 0.5)
        $(this).css({
            "backgroundColor": "var(--text-color)",
            "color": "white",
        })
        $(this).find('i').css({
            'color': 'white',
        })
    }
    updateProgress()
    saveTasks()

})
$(".showTasks").on("click", ".delete", function () {
    $(this).css({
        'font-size': '14px',
    })
    $(this).parent().fadeOut(300, function () {
        $(this).remove()
        updateProgress()
        saveTasks()
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
        'backgroundColor': 'var(--background)',
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

const saveTasks = () => {
    console.log('saveTasks is running')
    let tasks = []

    $('.task').each(function () {
        tasks.push({
            title: $(this).find('.title').text(),
            priority: $(this).find('span').first().text(),
            completed: $(this).hasClass('completed')
        })
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log('saved:', localStorage.getItem('tasks'))
}
const loadTasks = () => {
    let saved = localStorage.getItem('tasks')
    if (saved === null) return

    let tasks = JSON.parse(saved)

    tasks.forEach(function (task) {
        let li = $(`<li class="task">
            <span class="${task.priority}Pro">${task.priority}</span>
            <span class="title"></span>
            <button class="done"><i class="fa-solid fa-check"></i> Done</button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </li>`)

        li.find('.title').text(task.title)
        $('section.showTasks').append(li)

        if (task.completed) {
            li.find('.done').trigger('click')
        }

    })

    updateProgress()
    saveTasks()

}
updateProgress()
loadTasks()








