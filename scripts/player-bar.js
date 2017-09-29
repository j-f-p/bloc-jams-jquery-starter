$(document).ready( function() {
  $('button#previous').click( function() {
    if( player.playState=='playing' &&
        album.songs.indexOf(player.currentlyPlaying) > 0 ) {
      player.playPause(
        album.songs[album.songs.indexOf(player.currentlyPlaying) - 1]
      );
      player.waitForSong(
        () => $('#time-control .total-time').text(player.getDuration()) );
    }
  });

  $('button#play-pause').click( function() {
    //console.log(player.playState);
    player.playPause();
    $(this).attr('playState',player.playState);

    //if(player.playState==='paused' || player.playState==='stopped')
    if(player.playState==='playing')
//      $('#time-control .total-time').text(player.getDuration());
      player.waitForSong(
        () => $('#time-control .total-time').text(player.getDuration()) );
  });

  $('button#next').click( function() {
    if( player.playState=='playing' &&
        album.songs.indexOf(player.currentlyPlaying) < album.songs.length-1 ) {
      player.playPause(
        album.songs[album.songs.indexOf(player.currentlyPlaying) + 1]
      );
      player.waitForSong(
        () => $('#time-control .total-time').text(player.getDuration()) );
    }
  });

  $('#time-control input').on('input', function(event) {
    player.skipTo(event.target.value);
  });

  //window.myInterval =
  setInterval( () => {
    $('#time-control .current-time').text(player.getTime());
    $('#time-control input').val(
      100 * player.getTimeSeconds() / player.getDurationSeconds());
  }, 1000);

  $('#volume-control input').on('input', function(event) {
    player.setVolume(event.target.value);
  });

});
