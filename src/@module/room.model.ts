//interface 只需宣告變數型別，無須給初始值
export interface Room{
    roomNumber: string,
    playerOne: string,
    playerTwo: string,
    operateCode: string,
    chessboard: Chess[][]
}

export interface Chess{
    chessNo: string;
    push: boolean;
}

export interface Player{
    roomNumber: string;
    player: string;
    coordinate: number[];
}