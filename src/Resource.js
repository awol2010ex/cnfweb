var dirImg = "res/images/";
var dirMusic = "res/Music/";//音乐
var dirMap = "res/map/";//地图
var dirSprite = "res/sprite/";//精灵
var dirScreen="res/screen/";//画面
var dirMenu="res/menu/";//菜单

//img
var s_mugen_power_logo_img = dirImg +"mugen-power-logo.jpg";
var s_0000000_hotel_img= dirMap +"0000000_hotel.png";


//tmx
var s_0000000_hotel_tmx= dirMap +"0000000_hotel.tmx";

//pvr
//一户
var s_ichigo_plist =dirSprite +"ichigo.plist";
var s_ichigo_png =dirSprite +"ichigo.png";
//虚
var s_HollowInvasion_plist =dirSprite +"HollowInvasion.plist";
var s_HollowInvasion_png =dirSprite +"HollowInvasion.png";
//开机
var g_startgame =[
    {src:s_mugen_power_logo_img}//开机画面
];




var g_maingame =[
    {src:s_0000000_hotel_tmx}//地图
   , {src:s_0000000_hotel_img}//地图
   
   , {src:s_ichigo_plist}//精灵
   , {src:s_ichigo_png}//精灵
   
   , {src:s_HollowInvasion_plist}//精灵
   , {src:s_HollowInvasion_png}//精灵
];