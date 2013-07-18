var dirImg = "res/images/";
var dirMusic = "res/Music/";//锟斤拷锟斤拷
var dirMap = "res/map/";//锟斤拷图
var dirSprite = "res/sprite/";//锟斤拷锟斤拷
var dirScreen="res/screen/";//锟斤拷锟斤拷
var dirMenu="res/menu/";//锟剿碉拷

//img
var s_startup_img =dirImg +"startup.png";
var s_0000000_hotel_img= dirMap +"0000000_hotel.png";


//tmx
var s_0000000_hotel_tmx= dirMap +"0000000_hotel.tmx";

//pvr
//
var s_cnf_plist =dirSprite +"cnf.plist";
var s_cnf_png =dirSprite +"cnf.png";
//开机画面
var g_startgame =[
    {src:s_startup_img}
];




var g_maingame =[
    {src:s_0000000_hotel_tmx}//地图
   , {src:s_0000000_hotel_img}//
   
   , {src:s_cnf_plist}//精灵
   , {src:s_cnf_png}//
];