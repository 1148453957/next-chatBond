async function getBotsFromApi(apiKey) {
  try {
    const response = await fetch('https://chatbot.allyfy.chat/api/v1/zp/bots?apiKey=' + apiKey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Failed to fetch bots: ' + response.status)

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching bots:', error)
    return []
  }
}

jQuery(document).ready(function ($) {
  $('#api_key').on('input', async function () {
    var apiKey = $(this).val()
    $('#botName').empty().append('<option value="">Loading...</option>')
    var bots = await getBotsFromApi(apiKey)
    console.log(bots)
    $('#botName').empty()
    if (bots.length > 0) {
      $.each(bots, function (index, bot) {
        console.log(bot)
        $('#botName').append('<option value="' + bot.botName + '">' + bot.botName + '</option>')
        $('#botId').val(bot.botId)
      })
    } else {
      $('#botName').append('<option value="">No bots found</option>')
      $('#botId').val('')
    }
  })
})
