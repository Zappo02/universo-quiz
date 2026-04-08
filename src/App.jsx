09:17:53.189 /vercel/path0/src/App.jsx:1719:43: ERROR: The symbol "setShowConfetti" has already been declared
09:17:53.189 /vercel/path0/src/App.jsx:1719:43: ERROR: The symbol "showConfetti" has already been declared[39m
09:17:53.190 1717|    const colBg={green:US.green,yellow:US.yellow,gray:"#9ca3af"};
09:17:53.190 1718|  
09:17:53.190 1719|    const[hint,setHint]=useState(false);const[showConfetti,setShowConfetti]=useState(false);
09:17:53.190    |                                             ^
09:17:53.190 1720|    useEffect(()=>{if(status==="won"&&!showConfetti)setTimeout(()=>setShowConfetti(true),word.length*130+400);},[status]);
09:17:53.191 1721|    if(savedToday)return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="wordle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
09:17:53.191 1717|    const colBg={green:US.green,yellow:US.yellow,gray:"#9ca3af"};
09:17:53.191 1718|  
09:17:53.192 1719|    const[hint,setHint]=useState(false);const[showConfetti,setShowConfetti]=useState(false);
09:17:53.192    |                                             ^
09:17:53.192 1720|    useEffect(()=>{if(status==="won"&&!showConfetti)setTimeout(()=>setShowConfetti(true),word.length*130+400);},[status]);
09:17:53.192 1721|    if(savedToday)return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="wordle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
09:17:53.199 [31merror during build:
09:17:53.199 Error: Transform failed with 2 errors:
09:17:53.200 /vercel/path0/src/App.jsx:1719:43: ERROR: The symbol "setShowConfetti" has already been declared
09:17:53.200 /vercel/path0/src/App.jsx:1719:43: ERROR: The symbol "showConfetti" has already been declared
09:17:53.200     at failureErrorWithLog (/vercel/path0/node_modules/esbuild/lib/main.js:1649:15)
09:17:53.201     at /vercel/path0/node_modules/esbuild/lib/main.js:847:29
09:17:53.201     at responseCallbacks.<computed> (/vercel/path0/node_modules/esbuild/lib/main.js:703:9)
09:17:53.201     at handleIncomingPacket (/vercel/path0/node_modules/esbuild/lib/main.js:762:9)
09:17:53.202     at Socket.readFromStdout (/vercel/path0/node_modules/esbuild/lib/main.js:679:7)
09:17:53.202     at Socket.emit (node:events:508:28)
09:17:53.202     at addChunk (node:internal/streams/readable:563:12)
09:17:53.203     at readableAddChunkPushByteMode (node:internal/streams/readable:514:3)
09:17:53.203     at Readable.push (node:internal/streams/readable:394:5)
09:17:53.203     at Pipe.onStreamRead (node:internal/stream_base_commons:189:23)[39m
09:17:53.224 Error: Command "npm run build" exited with 1
