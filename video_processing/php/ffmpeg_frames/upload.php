<?php
require_once "phar://../iron_worker.phar";

$worker = new IronWorker();

$params = array('stack' => 'ffmpeg-2.3');
$worker->upload("worker/", 'ffmpeg.php', "FFmpeg-Frames", $params);