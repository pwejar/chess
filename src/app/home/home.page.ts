import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  cells: any = [];
  slides: any;
  slides2: any;
  size: any;
  counter = 1;
  lastId: any;
  whoIsToPlay = 'white';
  lastMoveOpp: any;
  hasTheKingMovedW = false;
  hasTheKingMovedb = false;
  hasTheRookMovedW = false;
  hasTheRookMovedb = false;
  hasTheRook1MovedW = false;
  hasTheRook1Movedb = false;
  numberOfMoves = 0;
  queeningS = false;
  kingWPosition = '';
  kingBPosition = '';
  possibleArr = [];
  gameStatus = 'notStarted';
  maliziaJob1 = [];
  maliziaJob2 = [];
  kingsSaftyArr = [];
  impassantW = '';
  impassantB = '';
  showKula = true;
  toBeEaten = [];
  alfabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  gameData = [
    {
      uId: '',
      resulst: '',
      black: { name: '', rating: '', uId: '', clock: 0 },
      white: { name: '', rating: '', uId: '', clock: 0 },
      gameDetails: { tournament: 'kilifi chess online', start: 0 , stop: 0},
      moves: []
    }
  ];
  constructor() {}
  ngOnInit(): void {
    this.renderCells();
    this.slides = document.querySelector('#theSlider1');
    this.slides2 = document.querySelector('#theSlider2');
    this.size = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.slides.style.transform = 'translateX(' + (-this.size * this.counter * 0.3) + 'px)';
    this.slides2.style.transform = 'translateX(' + (-this.size * this.counter * 0.3 * 7) + 'px)';
    this.Repeat();
  }
  
  Repeat() {
    setTimeout(() => {
      this.functionSlide();
      this.Repeat();

    }, 6000);
  }
  functionSlide() {
    this.slides.style.transition = 'transform 0.4s ease-in-out';
    this.slides2.style.transition = 'transform 0.4s ease-in-out';
    this.counter ++;
    this.slides.style.transform = 'translateX(' + (-this.size * this.counter * 0.3) + 'px)';
    this.slides2.style.transform = 'translateX(' + (-this.size * (8 - this.counter) * 0.3) + 'px)';
    this.size = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (this.counter > 7) {
      this.slides.style.transition = 'none';
      this.slides2.style.transition = 'none';
      this.counter = 1;
      this.slides.style.transform = 'translateX(' + (-this.size * this.counter * 0.3) + 'px)';
      this.slides2.style.transform = 'translateX(' + (-this.size * (8 - this.counter ) * 0.3) + 'px)';
    }
  }
  isEven(n) {
    return n % 2 === 0;
 }
 getSomeClass(id) {
  const ids = id.split('');
  if (ids[0] === 'a' || ids[0] === 'c' || ids[0] === 'e' || ids[0] === 'g' ) {
    if (this.isEven(+ids[1])) {
      return 'whitit';
    }
  } else {
    if (!this.isEven(+ids[1])) {
      return 'whitit';
    }
  }
  return 'darkit';
 }
  renderCells() {
    this.cells = [];

    for (let k = 8; k > 0; k--) {
        for ( const cells of this.alfabets) {
          let piece1 = '/assets/chess/xxx.svg';
          if (k === 2) {
            piece1 = '/assets/chess/pw.svg';
          }
          if (k === 7) {
            piece1 = '/assets/chess/pb.svg';
          }
          if (k === 1) {
            if (cells === 'a' || cells === 'h' ) {
              piece1 = '/assets/chess/rw.svg';
            }
            if (cells === 'b' || cells === 'g' ) {
              piece1 = '/assets/chess/nw.svg';
            }
            if (cells === 'c' || cells === 'f' ) {
              piece1 = '/assets/chess/bw.svg';
            }
            if (cells === 'd' ) {
              piece1 = '/assets/chess/qw.svg';
            }
            if (cells === 'e' ) {
              piece1 = '/assets/chess/kw.svg';
              this.kingWPosition = 'e1';
            }
          }
          if (k === 8) {
            if (cells === 'a' || cells === 'h' ) {
              piece1 = '/assets/chess/rb.svg';
            }
            if (cells === 'b' || cells === 'g' ) {
              piece1 = '/assets/chess/nb.svg';
            }
            if (cells === 'c' || cells === 'f' ) {
              piece1 = '/assets/chess/bb.svg';
            }
            if (cells === 'd' ) {
              piece1 = '/assets/chess/qb.svg';
            }
            if (cells === 'e') {
              piece1 = '/assets/chess/kb.svg';
              this.kingBPosition = 'e8';
            }
          }

          this.cells.push({id: cells + k, alphabert: cells, namba: k , piece: piece1 });
        }

      }

  }

  wekaShadow(cell) {
    if ( this.gameStatus === 'checkMate' || this.gameStatus === 'stale') {
      return;
    }
    if (this.queeningS) {
      return;
    }
    const cellElem = document.getElementById(cell);
    const myimgr = cellElem.getElementsByTagName('img')[0];
    const sdf = myimgr.src.split('');
    const cellDetails2 = cell.split('');
    const pieceColor = sdf[sdf.length - 5];
    const pieceName1 = sdf[sdf.length - 6];
    let movingPiece = '';
    let movingColor = '';

    if (this.lastId) {
        movingPiece = this.lastId.src.split('')[this.lastId.src.split('').length - 6];
        movingColor = this.lastId.src.split('')[this.lastId.src.split('').length - 5];
      }
    for ( const id of this.maliziaJob1) {
        if (id.id === cell) {
          // if it was a possible move
          const movedP = this.lastId.src.split('')[myimgr.src.split('').length - 7];
          const movedPC = this.lastId.src.split('')[myimgr.src.split('').length - 6];
          if ( movedP === 'p' && cell.split('')[1] === '1' ||  movedP === 'p' && cell.split('')[1] === '8') {
            // queen
            this.queeningS = true;
            if (this.whoIsToPlay === 'white') {
              const imggg = (document.getElementById('queningW')as HTMLImageElement);
              imggg.style.display = 'block';
            }
            if (this.whoIsToPlay === 'black') {
              const imggg = (document.getElementById('queningB')as HTMLImageElement);
              imggg.style.display = 'block';
            }
          }

          if (!this.hasTheKingMovedW && cell === 'g1' && movedP === 'k') {
            // perform catsling white short castle
            const imggg = (document.getElementById('h12')as HTMLImageElement);
            const imggg2 = (document.getElementById('f12')as HTMLImageElement);
            imggg.src = '/assets/chess/xxx.svg';
            imggg2.src = '/assets/chess/rw.svg';

          }
          if (!this.hasTheKingMovedb && cell === 'g8' && movedP === 'k') {
            // perform catsling white short castle
            const imggg = (document.getElementById('h82')as HTMLImageElement);
            const imggg2 = (document.getElementById('f82')as HTMLImageElement);
            imggg.src = '/assets/chess/xxx.svg';
            imggg2.src = '/assets/chess/rb.svg';

          }
          if (!this.hasTheKingMovedW && cell === 'c1' && movedP === 'k') {
            // perform catsling white long castle
            const imggg = (document.getElementById('a12')as HTMLImageElement);
            const imggg2 = (document.getElementById('d12')as HTMLImageElement);
            imggg.src = '/assets/chess/xxx.svg';
            imggg2.src = '/assets/chess/rw.svg';

          }
          if (!this.hasTheKingMovedb && cell === 'c8' && movedP === 'k') {
            // perform catsling white long castle
            const imggg = (document.getElementById('a82')as HTMLImageElement);
            const imggg2 = (document.getElementById('d82')as HTMLImageElement);
            imggg.src = '/assets/chess/xxx.svg';
            imggg2.src = '/assets/chess/rb.svg';

          }

          myimgr.src = this.lastId.src;

          this.lastId.src = '/assets/chess/xxx.svg';
          this.lastId.style.setProperty('transform', 'scale(1) translateX(-50%) translateY(-50%)');
          this.lastId.style.setProperty('-webkit-filter', 'drop-shadow(0px 0px 0px #000)');
          if (this.lastMoveOpp) {
            this.lastMoveOpp.style.setProperty('transform', 'scale(1) translateX(-50%) translateY(-50%)');
            this.lastMoveOpp.style.setProperty('-webkit-filter', 'drop-shadow(0px 0px 0px #000)');
          }
          myimgr.style.setProperty('transform', 'scale(1.3) translateX(-40%) translateY(-40%)');
          myimgr.style.setProperty('-webkit-filter', 'drop-shadow(0px 0px 5px #00f)');
          this.lastMoveOpp = myimgr;
          this.cleanPossible();
          if ( movedPC === 'b' && movedP === 'k') {this.hasTheKingMovedb = true; this.kingBPosition = cell; }
          if (movedPC === 'w' && movedP === 'k') {this.hasTheKingMovedW = true; this.kingWPosition = cell; }
          if (movedPC === 'b' && movedP === 'r' && cellDetails2[0] === 'a') {this.hasTheRookMovedb = true; }
          if (movedPC === 'w' && movedP === 'r' && cellDetails2[0] === 'a') {this.hasTheRookMovedW = true; }
          if (movedPC === 'b' && movedP === 'r' && cellDetails2[0] === 'h') {this.hasTheRook1Movedb = true; }
          if (movedPC === 'w' && movedP === 'r' && cellDetails2[0] === 'h') {this.hasTheRook1MovedW = true; }

          this.gameStatusF();

          return;
        }
      }
    for ( const id of this.maliziaJob2) {
        if (id.id === cell + '1') {
          const movedP = this.lastId.src.split('')[myimgr.src.split('').length - 6];
          const movedPC = this.lastId.src.split('')[myimgr.src.split('').length - 5];
          if ( movedP === 'p' && cell.split('')[1] === '1' ||  movedP === 'p' && cell.split('')[1] === '8') {
            // queen
            this.queeningS = true;
            if (this.whoIsToPlay === 'white') {
              const imggg = (document.getElementById('queningW')as HTMLImageElement);
              imggg.style.display = 'block';
            }
            if (this.whoIsToPlay === 'black') {
              const imggg = (document.getElementById('queningB')as HTMLImageElement);
              imggg.style.display = 'block';
            }

          }
          if ( cell === this.impassantB && movingPiece === 'p' || cell === this.impassantW && movingPiece === 'p' ) {
            this.lastMoveOpp.src = '/assets/chess/xxx.svg';
          }
          if (movedPC === 'b' && movedP === 'k') {this.hasTheKingMovedb = true; this.kingBPosition = cell;  }
          if (movedPC === 'w' && movedP === 'k') {this.hasTheKingMovedW = true; this.kingWPosition = cell; }
          if (movedPC === 'b' && movedP === 'r' && cellDetails2[0] === 'h') {this.hasTheRookMovedb = true; }
          if (movedPC === 'w' && movedP === 'r' && cellDetails2[0] === 'h') {this.hasTheRookMovedW = true; }
          if (movedPC === 'b' && movedP === 'r' && cellDetails2[0] === 'a') {this.hasTheRook1Movedb = true; }
          if (movedPC === 'w' && movedP === 'r' && cellDetails2[0] === 'a') {this.hasTheRook1MovedW = true; }
          if (this.lastMoveOpp) {
            this.lastMoveOpp.style.setProperty('transform', 'scale(1) translateX(-50%) translateY(-50%)');
            this.lastMoveOpp.style.setProperty('-webkit-filter', 'drop-shadow(0px 0px 0px #000)');
          }
          myimgr.src = this.lastId.src;
          this.lastId.src = '/assets/chess/xxx.svg';
          myimgr.style.setProperty('transform', 'scale(1.3) translateX(-40%) translateY(-40%)');
          myimgr.style.setProperty('-webkit-filter', 'drop-shadow(0px 0px 5px #00f)');
          this.lastMoveOpp = myimgr;
          this.cleanPossible();
          this.gameStatusF();

          return;
        }
      }

    if (pieceColor === 'b' && this.whoIsToPlay === 'white') {
        return;
      }
    if (pieceColor === 'w' && this.whoIsToPlay === 'black') {
        return;
      }

    this.checkPossibleMoves( cell, cellDetails2, pieceColor, pieceName1);
    if (this.lastId) {
      this.lastId.style.setProperty('transform', 'scale(1) translateX(-50%) translateY(-50%)');
      this.lastId.style.setProperty('-webkit-filter', 'drop-shadow(0px 0px 0px #000)');
    }
    const thecell = document.getElementById(cell);
    const myimg = thecell.getElementsByTagName('img')[0];
    myimg.style.setProperty('transform', 'scale(1.3) translateX(-40%) translateY(-40%)');
    myimg.style.setProperty('-webkit-filter', 'drop-shadow(0px 0px 5px #f00)');
    this.lastId = myimg;
  }
  cleanPossible() {
    for ( const decll of this.maliziaJob1) {
      const gret = document.getElementById(decll.id + '1');
      gret.style.boxShadow = '0 0 0 #999999';
      gret.style.background = ' none';
      gret.style.display = 'node';
    }
    for ( const decll1 of this.maliziaJob2) {
      decll1.style.boxShadow = '0 0 0 #999999';
      decll1.style.background = ' none';
      decll1.style.display = 'none';

    }
    this.possibleArr = [];
    this.toBeEaten = [];
    this.maliziaJob1 = [];
    this.maliziaJob2 = [];
  }
  checkPossibleMoves( cell, cellDetails2, pieceColor, pieceName1) {
    this.cleanPossible();
    const arrr = cell.split('');
    const row = +arrr[1];
    const col = this.alfabets.indexOf(arrr[0]);
    if ( pieceName1 === 'p') {
      this.pawnGen(pieceColor, row, col, cell, cellDetails2);
    }
    if (pieceName1 === 'b') {
      this.bishopGen(row, col, pieceColor);
    }
    if (pieceName1 === 'r') {
      this.rookGen(row, col, pieceColor);
    }
    if (pieceName1 === 'q') {
      this.bishopGen(row, col, pieceColor);
      this.rookGen(row, col, pieceColor);
    }
    if (pieceName1 === 'k') {
      this.kingGen(row, col, pieceColor);
    }
    if (pieceName1 === 'n') {
      this.knightGen(row, col, pieceColor);
    }
    // check king safty

    this.maliziaJob1 = this.possibleArr;
    this.maliziaJob2 = this.toBeEaten;
    this.possibleArr = [];
    this.toBeEaten = [];
    const finally1 = [];
    const finally2 = [];
    let row1 = 0;
    let col2 = 0;
    this.kingsSaftyArr = [];
    if (pieceColor === 'w') {
      row1 = +this.kingWPosition.split('')[1];
      col2 = this.alfabets.indexOf(this.kingWPosition.split('')[0]);
    }
    if (pieceColor === 'b') {
      row1 = +this.kingBPosition.split('')[1];
      col2 = this.alfabets.indexOf(this.kingBPosition.split('')[0]);
    }
    for ( const newcells of this.maliziaJob1) {
      if (pieceName1 === 'k') {
        row1 = +newcells.id.split('')[1];
        col2 = this.alfabets.indexOf(newcells.id.split('')[0]);
      }
      this.kingsSafty( row1, col2, pieceColor, newcells.id, cell);
      if (this.kingsSaftyArr.length === 0) {
        finally1.push(newcells);
      }
      this.kingsSaftyArr = [];
    }

    for ( const newcells of this.maliziaJob2) {
      const newsele = newcells.id.split('')[0] + newcells.id.split('')[1];
      if (pieceName1 === 'k') {
        row1 = +newsele.split('')[1];
        col2 = this.alfabets.indexOf(newsele.split('')[0]);
      }
      this.kingsSafty( row1, col2, pieceColor, newsele, cell);

      if (this.kingsSaftyArr.length === 0) {
        finally2.push(newcells);
      }
      this.kingsSaftyArr = [];
    }
    this.maliziaJob1 = finally1;
    this.maliziaJob2 = finally2;
    // finish rendering possible
    let i = 0;
    for ( const decll of this.maliziaJob1) {
      const gret = document.getElementById(decll.id + '1');
      gret.style.boxShadow = '0 0 10px #999999';
      gret.style.transition = 'all 0.3s ease-out ' + ((i * 0.01) / this.maliziaJob1.length ) + 's';
      gret.style.background = ' green';
      gret.style.display = 'block';
      i++;
    }
    i = 0;
    for ( const decll of this.maliziaJob2) {

      decll.style.boxShadow = '0 0 10px #999999';
      decll.style.transition = 'all 0.3s ease-out ' + ((i * 0.01) / this.maliziaJob2.length ) + 's';
      decll.style.background = ' red';
      decll.style.display = 'block';
      i++;
    }
  }
  pawnGen(pieceColor, row, col, cell, cellDetails2) {
    // - if white pawn
    if (pieceColor === 'w' ) {
      if (row + 1 < 9) {
       // check what piece is ahead
       const ssddd23 = (document.getElementById(cellDetails2[0] + (row + 1) + '2') as HTMLImageElement).src;
       if (ssddd23.split('')[ssddd23.split('').length - 5] === 'x') {
       // no piece ahead
         this.possibleArr.push({id: cellDetails2[0] + (row + 1) });
       // if the pawn hasn't moved
         if (row === 2) {
           const ssddd25 = (document.getElementById(cellDetails2[0] + (row + 2) + '2')as HTMLImageElement).src;
           if (ssddd25.split('')[ssddd25.split('').length - 5] === 'x') {
             // no piece ahead
             this.possibleArr.push({id: cellDetails2[0] + 4 });
             this.impassantB = cellDetails2[0] + 3;
           }
         }
       }
      }

      if (row < 8 ) {
       const newNumbe = row + 1;
       if (col > 0 && col < 8) {
         // space available top left
         const newAlfa = this.alfabets[col - 1];
         const pieceColorToBeEaten = (document.getElementById(newAlfa + '' + newNumbe + '2')as HTMLImageElement).src;
         if (pieceColorToBeEaten.split('')[pieceColorToBeEaten.split('').length - 5] === 'b') {
         // piece to be eaten is black
         const qwert1 = document.getElementById(newAlfa + '' + newNumbe + '1');
         this.toBeEaten.push(qwert1);
         }
         if (pieceColorToBeEaten.split('')[pieceColorToBeEaten.split('').length - 5] === 'x' &&
         this.impassantW === newAlfa + '' + newNumbe ) {
          // piece to be eaten impassant
          const qwert1 = document.getElementById(newAlfa + '' + newNumbe + '1');
          this.toBeEaten.push(qwert1);
          }
       }
       if (col > -1 && col < 7) {
         // space available to right
          const newAlfa = this.alfabets[col + 1];
          const ssddd = (document.getElementById(newAlfa + '' + newNumbe + '2')as HTMLImageElement).src;
          if (ssddd.split('')[ssddd.split('').length - 5] === 'b') {
         // piece to be eaten is black
          const qwert = document.getElementById(newAlfa + '' + newNumbe + '1');
          this.toBeEaten.push(qwert);
          }
          if (ssddd.split('')[ssddd.split('').length - 5] === 'x' &&
          this.impassantW === newAlfa + '' + newNumbe) {
            // piece to be eaten is impassant
             const qwert = document.getElementById(newAlfa + '' + newNumbe + '1');
             this.toBeEaten.push(qwert);
             }

        }
      }
     }
     // - if black pawn
    if (pieceColor === 'b') {

       const arrr = cell.split('');
       row = +arrr[1];
       col = this.alfabets.indexOf(arrr[0]);

       if (row - 1 > 0 ) {
        // check what piece is ahead
        const ssddd23 = (document.getElementById(cellDetails2[0] + (row - 1) + '2')as HTMLImageElement).src;
        if (ssddd23.split('')[ssddd23.split('').length - 5] === 'x') {
        // no piece ahead
          this.possibleArr.push({id: cellDetails2[0] + (row - 1) });
        // if the pawn hasn't moved
          if (row === 7) {
            const ssddd25 = (document.getElementById(cellDetails2[0] + (row - 2) + '2')as HTMLImageElement).src;
            if (ssddd25.split('')[ssddd25.split('').length - 5] === 'x') {
              // no piece ahead
              this.possibleArr.push({id: cellDetails2[0] + 5 });
              this.impassantW = cellDetails2[0] + 6;
            }
          }
        }
       }

       if (row - 1 > 0 ) {
        const newNumbe = row - 1;
        if (col > 0 && col < 8) {
          // space available bottom left
          const newAlfa = this.alfabets[col - 1];
          const pieceColorToBeEaten = (document.getElementById(newAlfa + '' + newNumbe + '2')as HTMLImageElement).src;
          if (pieceColorToBeEaten.split('')[pieceColorToBeEaten.split('').length - 5] === 'w') {
          // piece to be eaten is black
          const qwert1 = document.getElementById(newAlfa + '' + newNumbe + '1');
          this.toBeEaten.push(qwert1);
          }
          if (pieceColorToBeEaten.split('')[pieceColorToBeEaten.split('').length - 5] === 'x' &&
          this.impassantB === newAlfa + '' + newNumbe) {
            // piece to be eaten is black
            const qwert1 = document.getElementById(newAlfa + '' + newNumbe + '1');
            this.toBeEaten.push(qwert1);
            }
        }
        if (col + 1 > 0 && col + 1 < 8) { // shida
          // space available bottom right
          const newAlfa = this.alfabets[col + 1];
          const pieceColorToBeEaten = (document.getElementById(newAlfa + '' + newNumbe + '2')as HTMLImageElement).src;
          if (pieceColorToBeEaten.split('')[pieceColorToBeEaten.split('').length - 5] === 'w') {
          // piece to be eaten is black
          const qwert1 = document.getElementById(newAlfa + '' + newNumbe + '1');
          this.toBeEaten.push(qwert1);
          }
          if (pieceColorToBeEaten.split('')[pieceColorToBeEaten.split('').length - 5] === 'x' &&
          this.impassantB === newAlfa + '' + newNumbe) {
            // piece to be eaten is black
            const qwert1 = document.getElementById(newAlfa + '' + newNumbe + '1');
            this.toBeEaten.push(qwert1);
            }
        }
}
      }
  }
  bishopGen(row, col, pieceColor) {
    // top right
    let newCol = col + 1;
    let newRow = row + 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol > 7) {
        break;
      }
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      newCol ++;
      newRow ++;
    }
    // top left
    newCol = col - 1;
    newRow = row + 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol < 0 ) {
        break;
      }
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      newCol --;
      newRow ++;
    }
    // bottom left
    newCol = col - 1;
    newRow = row - 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol < 0 ) {
        break;
      }
      if ( newRow < 1 ) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      newCol --;
      newRow --;
    }
    // bottom right
    newCol = col + 1;
    newRow = row - 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol > 7 ) {
        break;
      }
      if ( newRow < 1 ) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      newCol ++;
      newRow --;
    }

  }
  rookGen(row, col, pieceColor) {
    // top
    let newCol = col;
    let newRow = row + 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

      newRow ++;
    }
    // bottpm
    newCol = col;
    newRow = row - 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newRow < 1) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

      newRow --;
    }
    // left
    newCol = col - 1 ;
    newRow = row  ;
    for (let j = 0; j < 9; j++) {
      if ( newCol < 0) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

      newCol --;
    }
    // right
    newCol = col + 1;
    newRow = row  ;
    for (let j = 0; j < 9; j++) {
      if ( newCol > 7) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

      newCol ++;
    }
  }
  kingGen(row, col, pieceColor) {
    // top
    let newCol = col;
    let newRow = row + 1 ;
    for (let j = 0; j < 1; j++) {
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

      newRow ++;
    }
    // bottpm
    newCol = col;
    newRow = row - 1 ;
    for (let j = 0; j < 1; j++) {
      if ( newRow < 1) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

      newRow --;
    }
    // left
    newCol = col - 1 ;
    newRow = row  ;
    for (let j = 0; j < 1; j++) {
      if ( newCol < 0) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });
        // Castling left
      let row1 = 0;
      let col2 = 0;
      if (pieceColor === 'w') {
      row1 = +this.kingWPosition.split('')[1];
      col2 = this.alfabets.indexOf(this.kingWPosition.split('')[0]);
    }
      if (pieceColor === 'b') {
      row1 = +this.kingBPosition.split('')[1];
      col2 = this.alfabets.indexOf(this.kingBPosition.split('')[0]);
    }
      this.kingsSaftyArr = [];
      this.kingsSafty( newRow, newCol, pieceColor, this.alfabets[newCol] + newRow , this.alfabets[col2] + row1);

      if ( !this.hasTheKingMovedb && !this.hasTheRookMovedb && pieceColor === 'b' ||
        !this.hasTheKingMovedW && !this.hasTheRookMovedW && pieceColor === 'w') {
          newCol = col - 2;
          newRow = row  ;
          for (let q = 0; q < 1; q++) {
        if ( newCol < 0) {
          break;
        }
        const imgYYY23 = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
        const imgYYY231 = (document.getElementById(this.alfabets[newCol - 1] + newRow + '2')as HTMLImageElement).src;
        if (imgYYY23.split('')[imgYYY23.split('').length - 5] === pieceColor ) {
          break;
        }
        if (imgYYY231.split('')[imgYYY231.split('').length - 5] === pieceColor ||
        imgYYY231.split('')[imgYYY231.split('').length - 5] !== 'x') {
          break;
        }
        if ( imgYYY23.split('')[imgYYY23.split('').length - 5] === 'x') {
          if ( this.kingsSaftyArr.length === 0 && this.gameStatus === 'active') {
           this.possibleArr.push({id: this.alfabets[newCol ] + newRow });
          }

        }
      }
    }
      newCol --;
    }
    // right
    newCol = col + 1;
    newRow = row  ;
    for (let j = 0; j < 1; j++) {
      if ( newCol > 7) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      // Castling right
      let row1 = 0;
      let col2 = 0;
      if (pieceColor === 'w') {
      row1 = +this.kingWPosition.split('')[1];
      col2 = this.alfabets.indexOf(this.kingWPosition.split('')[0]);
    }
      if (pieceColor === 'b') {
      row1 = +this.kingBPosition.split('')[1];
      col2 = this.alfabets.indexOf(this.kingBPosition.split('')[0]);
    }
      this.kingsSaftyArr = [];
      this.kingsSafty( newRow, newCol, pieceColor, this.alfabets[newCol] + newRow , this.alfabets[col2] + row1);

      if ( !this.hasTheKingMovedb && !this.hasTheRook1Movedb && pieceColor === 'b' ||
      !this.hasTheKingMovedW && !this.hasTheRook1MovedW && pieceColor === 'w') {
        newCol = col + 2;
        newRow = row  ;
        for (let q = 0; q < 1; q++) {
      if ( newCol > 7) {
        break;
      }
      const imgYYY23 = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      if (imgYYY23.split('')[imgYYY23.split('').length - 5] === pieceColor ) {
        break;
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] === 'x') {
        if ( this.kingsSaftyArr.length === 0  && this.gameStatus === 'active') {
          this.possibleArr.push({id: this.alfabets[newCol ] + newRow });
        }
      }
    }
  }




    }

    // top right
    newCol = col + 1;
    newRow = row + 1;
    for (let j = 0; j < 1; j++) {
      if ( newCol > 7) {
        break;
      }
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

    }
    // top left
    newCol = col - 1;
    newRow = row + 1;
    for (let j = 0; j < 1; j++) {
      if ( newCol < 0 ) {
        break;
      }
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

    }
    // bottom left
    newCol = col - 1;
    newRow = row - 1;
    for (let j = 0; j < 1; j++) {
      if ( newCol < 0) {
        break;
      }
      if ( newRow < 1) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

    }
    // bottom right
    newCol = col + 1;
    newRow = row - 1;
    for (let j = 0; j < 1; j++) {
      if ( newCol > 7) {
        break;
      }
      if ( newRow < 1) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');

      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        break;
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
       this.toBeEaten.push(imgYYY1);
       break;
      }
      this.possibleArr.push({id: this.alfabets[newCol] + newRow });

    }
  }
  knightGen(row, col, pieceColor) {
    // top right top
    let newCol = col + 1;
    let newRow = row + 2 ;
    if (newCol < 8 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
    // top right bottom
    newCol = col + 2;
    newRow = row + 1 ;
    if (newCol < 8 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
    // top left top
    newCol = col - 1;
    newRow = row + 2 ;
    if (newCol > -1 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
    // top left bottom
    newCol = col - 2;
    newRow = row + 1 ;
    if (newCol > -1 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
    // bottom left top
    newCol = col - 2;
    newRow = row - 1 ;
    if (newCol > -1 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
    //  bottom left botttom
    newCol = col - 1;
    newRow = row - 2;
    if (newCol > -1 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
    // bottom right botttom
    newCol = col + 1;
    newRow = row - 2;
    if (newCol < 8 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
    // bottom right botttom
    newCol = col + 2;
    newRow = row - 1;
    if (newCol < 8 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      const color = imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5];
      if ( color === 'x') {
        this.possibleArr.push({id: this.alfabets[newCol] + newRow });
      }
      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        this.toBeEaten.push(imgYYY1);
      }
    }
  }
  kingsSafty( row, col, pieceColor, newcells, cell) {
    // top

    let newCol = col;
    let newRow = row + 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'r' ||
        pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'q'
        ) {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }

      newRow ++;
    }
    // bottom
    newCol = col;
    newRow = row - 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newRow < 1) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'r' ||
        pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'q'
        || j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'k') {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }
      newRow --;
    }
    // left
    newCol = col - 1 ;
    newRow = row  ;
    for (let j = 0; j < 9; j++) {
      if ( newCol < 0) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'r' ||
        pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'q') {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }
      newCol --;
    }
    // right
    newCol = col + 1;
    newRow = row  ;
    for (let j = 0; j < 9; j++) {
      if ( newCol > 7) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'r' ||
        pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'q') {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }
      newCol ++;
    }
    // top right
    newCol = col + 1;
    newRow = row + 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol > 7) {
        break;
      }
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (imgYYY.split('')[imgYYY.split('').length - 6] === 'b' ||
        imgYYY.split('')[imgYYY.split('').length - 6] === 'q') {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if (j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'p' && pieceColor === 'w' 
        || j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'k' ) {
          this.kingsSaftyArr.push(imgYYY1);
        }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }
      newCol ++;
      newRow ++;
    }
    // top left
    newCol = col - 1;
    newRow = row + 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol < 0 ) {
        break;
      }
      if ( newRow > 8) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (imgYYY.split('')[imgYYY.split('').length - 6] === 'b' || imgYYY.split('')[imgYYY.split('').length - 6] === 'q') {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if (j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'p' && pieceColor === 'w'
        || j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'k') {
        this.kingsSaftyArr.push(imgYYY1);
      }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }
      newCol --;
      newRow ++;
    }
    // bottom left
    newCol = col - 1;
    newRow = row - 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol < 0 ) {
        break;
      }
      if ( newRow < 1 ) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'b' ||
        pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'q') {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if (j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'p' && pieceColor === 'b'
        || j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'k') {
        this.kingsSaftyArr.push(imgYYY1);
      }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }
      newCol --;
      newRow --;
    }
    // bottom right
    newCol = col + 1;
    newRow = row - 1 ;
    for (let j = 0; j < 9; j++) {
      if ( newCol > 7 ) {
        break;
      }
      if ( newRow < 1 ) {
        break;
      }
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2')as HTMLImageElement).src;
      const imgYYY1 = document.getElementById(this.alfabets[newCol] + newRow + '1');
      if (newcells === this.alfabets[newCol] + newRow) { break; }
      if (imgYYY.split('')[imgYYY.split('').length - 5] === pieceColor ) {
        if ( cell !== this.alfabets[newCol] + newRow) { break; }
      }
      if (imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 5] !== 'x') {
        if (pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'b' ||
        pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'q') {
          this.kingsSaftyArr.push(imgYYY1);
       }
        if (j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'p' && pieceColor === 'b'
        || j === 0 && imgYYY.split('')[imgYYY.split('').length - 6] === 'k') {
        this.kingsSaftyArr.push(imgYYY1);
      }
        if ( newcells !== this.alfabets[newCol] + newRow) {
        break;
      }
      }
      newCol ++;
      newRow --;
    }
    // top right top
    newCol = col + 1;
    newRow = row + 2 ;
    if (newCol < 8 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
    // top right bottom
    newCol = col + 2;
    newRow = row + 1 ;
    if (newCol < 8 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
    // top left top
    newCol = col - 1;
    newRow = row + 2 ;
    if (newCol > -1 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
    // top left bottom
    newCol = col - 2;
    newRow = row + 1 ;
    if (newCol > -1 && newRow < 9) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
    // bottom left top
    newCol = col - 2;
    newRow = row - 1 ;
    if (newCol > -1 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
    //  bottom left botttom
    newCol = col - 1;
    newRow = row - 2;
    if (newCol > -1 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
    // bottom right botttom
    newCol = col + 1;
    newRow = row - 2;
    if (newCol < 8 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
    // bottom right botttom
    newCol = col + 2;
    newRow = row - 1;
    if (newCol < 8 && newRow > 0) {
      const imgYYY = (document.getElementById(this.alfabets[newCol] + newRow + '2') as HTMLImageElement).src;

      if ( imgYYY.split('')[imgYYY.split('').length - 5] !== pieceColor && imgYYY.split('')[imgYYY.split('').length - 6] === 'n') {
        if (newcells !== this.alfabets[newCol] + newRow ) {this.kingsSaftyArr.push(imgYYY); }
      }
    }
  }
  tafutaMove(color) {
    this.maliziaJob1 = [];
    this.maliziaJob2 = [];
    this.numberOfMoves = 0;
    for (let qw = 1; qw < 9; qw ++) {
      for (const letter of this.alfabets ) {
        const cellElem = document.getElementById( letter + qw);
        const myimgr = cellElem.getElementsByTagName('img')[0];
        const sdf = myimgr.src.split('');
        const cellDetails2 = (letter + qw).split('');
        const pieceColor = sdf[sdf.length - 5];
        const pieceName1 = sdf[sdf.length - 6];
        if (pieceColor === color) {
          this.checkPossibleMoves( letter + qw , cellDetails2, color, pieceName1);
          this.numberOfMoves = this.numberOfMoves + +this.maliziaJob1.length + this.maliziaJob2.length;
        }
      }
    }

  }
  gameStatusF() {
    if (this.whoIsToPlay === 'black') {
      this.impassantB = '';
      this.whoIsToPlay = 'white';
      this.kingsSaftyArr = [];
      this.kingsSafty( +this.kingWPosition.split('')[1], this.alfabets.indexOf(this.kingWPosition.split('')[0]) , 'w', '', '');
      if (this.kingsSaftyArr.length !== 0) {
        this.gameStatus = 'check';
        this.tafutaMove('w');
        if (this.numberOfMoves === 0) {
          this.gameStatus = 'checkMate';
          // this.serveMe.showAlert(this.gameStatus, 2);
        }
        this.cleanPossible();
      } else {
        this.gameStatus = 'active';
        this.tafutaMove('w');
        if (this.numberOfMoves === 0) { this.gameStatus = 'active'; }
        this.cleanPossible();
       }
    } else {
      this.impassantW = '';
      this.whoIsToPlay = 'black';
      this.kingsSaftyArr = [];
      this.kingsSafty( +this.kingBPosition.split('')[1], this.alfabets.indexOf(this.kingBPosition.split('')[0]) , 'b', '', '');
      if (this.kingsSaftyArr.length !== 0) {
        this.gameStatus = 'check';
        this.tafutaMove('b');
        this.cleanPossible();
        if (this.numberOfMoves === 0) {
          this.gameStatus = 'checkMate';
         // this.serveMe.showAlert(this.gameStatus, 2);
        }
      } else {
        this.gameStatus = 'active';
        this.tafutaMove('b');
        if (this.numberOfMoves === 0) { this.gameStatus = 'stale'; }
        this.cleanPossible();
       }
    }
    console.log(this.gameStatus)
  }
  queening(src) {
    const imggg = (document.getElementById('queningB')as HTMLImageElement);
    const imggg1 = (document.getElementById('queningW')as HTMLImageElement);
    imggg.style.display = 'none';
    imggg1.style.display = 'none';
    this.lastMoveOpp.src = src;
    this.queeningS = false;
    if (this.whoIsToPlay === 'white') { this.whoIsToPlay = 'black'; } else {
      this.whoIsToPlay = 'white';
    }
    this.gameStatusF();

  }
  drop(ev, cell) {
    ev.preventDefault();
    this.wekaShadow(cell.id);
  }

  allowDrop(ev) {
    ev.preventDefault();
   // console.log(ev)
  }

  drag(ev, cell) {
    // ev.dataTransfer.setData("text", ev.target.id);
    this.wekaShadow(cell.id);

  }
}
