achieve - достигать
collision - столкновение, конфликт
committee - комитет, комиссия
conductor -  надёжность критерия
contemporary - современный
distinguish - различаться
employ (c) - реализовать
employ (n) - должность
environment - оборудование
forgo - отказываться 
full-duplex - дуплексный
generically - в общем
half-duplex - полудуплексный 
legacy - унаследованный
originally - первоначально
pattern - графический шаблон
slightly - незначительно
striking - замечательный
subcommittee - подкомиссия
totally - в итоге
IEEE - Institute of Electrical and Electronics Engineers - Институт инженеров по электротехнике и электронике




```
achieve v - достигать
collision - столкновение/коллизия
committe - комитет/комиссия
conductor - проводник/кондуктор
contemporary adj - современный
distinguish v - отличать/различать
employ v, n - использовать, работа/наем
environment - окружающая среда
forgo v - воздержаться/отказаться
full-duplex adj - полнодуплексный
generically adv - в общем
half-duplex adj - полудуплексный
legacy adj - устаревший
originally adj - оригинально/первоначально
pattern - шаблон
slightly adv - слегка/немного
striking adj - поразительный/выдающийся
subcommittee - подкомитет
totally adv - абсолютно/полностью
IEEE -  Institute of Electrical and Electronics Engineers (Институт инженеров электротехники и электроники)
```

Word combination

radial pattern - радиальная схема
to look nothing like - совсем не похож на
switched Ethernet network - коммутируемая сеть Ethernet
to act like - вести себя как
to give rise - вызывать/давать повод
full-duplex Ethernet - полнодуплексный интернет
at a time - за раз (за одно время)
to communnicate directly with - взаимодействовать напрямую с ...
at will - по усмотрению
collision-free environment - среда, свободная от столкновений
in place of - вместо
in conjuction with - совместно с ..
DIX standart - ДИКС стандарт
working group - рабочая группа
to be named after - присваивать значение
in most respect - в большинстве случаев








PART 14. ETHERNET OR 802. 3?
You may have heard the term 802.3 used in place of or in con-
junction with the term Ethernet. «Ethernet» originally referred
to a networking implementation standardized by Digital, Intel
and Xerox. (For this reason, it is also known as the DIX standard.)
In February 1980, the Institute of Electrical and Electronics
Engineers, or IEEE (pronounced «I triple E»), created a committee
to standardize network technologies. The IEEE titled this the
802 working group, named after the year and month of its for-
mation. Subcommittees of the 802 working group separately ad-
dressed different aspects of networking. The IEEE distinguished
each subcommittee by numbering it 802.X, with X representing
a unique number for each subcommittee. The 802.3 group stan-
dardized the operation of a CSMA / CD network that was func-
tionally equivalent to the DIX Ethernet.
Ethernet and 802.3 differ slightly in their terminology and
the data format for their frames, but are in most respects identi-
cal. Today, the term Ethernet refers generically to both the DIX
Ethernet implementation and the IEEE 802.3 standard.

















Текст с выделенными словами и переводами:

PART12. SWITCHED ETHERNET Modern Ethernet implementations often look nothing like their **исторический аналог** (historical counterpart). Where long runs of coaxial cable provided attachments for multiple stations in **устаревший Ethernet** (legacy Ethernet), modern Ethernet networks **использовать витую пару** (use twisted pair wiring) or fiber optics to connect stations in a **радиальная модель** (radial pattern). Where **устаревшие Ethernet сети** (legacy Ethernet networks) **передавали данные со скоростью 10 Мбит/с** (transmitted data at 10 megabits per second (Mbps)), modern networks can operate at 100 or even 1,000 Mbps! Perhaps the most striking advancement in **в современных сетях Ethernet** (contemporary Ethernet networks) is the use of switched Ethernet. **Коммутируемые сети заменяют** (Switched networks replace) the shared medium of legacy Ethernet with a dedicated segment for each station (Fig. 4). These segments connect to a switch, which acts much like an Ethernet bridge, but can connect many of these single station segments. Some switches today can **поддерживать сотню отдельных сегментов** (support hundreds of dedicated segments). Since the only devices on the segments are the switch and the end station, the switch picks up every transmission before it reaches another node. The switch then **пересылает фрейм в нужный сегмент** (forwards the frame over the appropriate segment), just like a bridge, but **но, так как** (since) any segment contains only a single node, the frame only **доходит до намеченного получателя** (reaches the intended recipient). This allows many conversations to occur simultaneously on a switched network. PART 13. FULL-DUPLEX ETHERNET Ethernet switching gave rise to another advancement, **дуплексный Ethernet** (full-duplex Ethernet). **Дуплексный Ethernet** (Full-duplex) is a **термин в передаче данных** (data communications term) that refers to the **способность одновременно передавать и принимать данные** (ability to send and receive data at the same time). Legacy Ethernet is half-duplex, meaning information can **перемещаться за раз только в одном направлении** (move in only one direction at a time). In a **полностью коммутируемая сеть** (totally switched network), nodes only communicate with the switch and never directly with each other. Switched networks also **используют или витую пару, или оптиковолокно** (employ either twisted pair or fiber optic cabling), both of which **используют отдельные провода** (use separate conductors) for sending and receiving data. **В этом режиме работы** (In this type of environment), Ethernet stations can **отказываться от процесса выявления конфликтов** (forgo the collision detection process) and transmit at will, since they are the only potential devices that can access the medium. This allows end stations to transmit to the switch at the same time that the switch transmits to them, achieving a **режим работы, исключающий конфликты** (collision-free environment).

**Слова - words**

исторический аналог - historical counterpart устаревший Ethernet - legacy Ethernet использовать - use витую пару - twisted pair радиальная модель - radial pattern передавать данные со скоростью 10 Мбит/с - transmit data at 10 Mbps в современных сетях Ethernet - in modern Ethernet networks коммутируемые сети заменяют - switched networks replace поддерживать сотню отдельных сегментов - support hundreds of dedicated segments пересылать фрейм в нужный сегмент - forward the frame over the appropriate segment но, так как - since доходить до намеченного получателя - reach the intended recipient дуплексный Ethernet - full-duplex Ethernet термин в передаче данных - term in data transmission способность одновременно передавать и принимать данные - ability to simultaneously transmit and receive data перемещаться за раз только в одном направлении - move in only one direction at a time полностью коммутируемая сеть - totally switched network использовать или витую пару, или оптиковолокно - use either twisted pair or fiber optic cable использовать отдельные провода - use separate wires в этом режиме работы - in this operating mode отказываться от процесса выявления конфликтов - forgo the collision detection process режим работы, исключающий конфликты - collision-free operating mode использовать вместо чего-л. - use instead of sth. первоначально относился к сетевым разработкам - initially referred to network developments институт инженеров по электронике и радио электронике - Institute of Electrical and Electronics Engineers (IEEE) создавать комитет - create a committee стандартизировать сетевые технологии - standardize network technologies исследовать различные аспекты создания сети - investigate various aspects of network creation различать каждый подкомитет - distinguish each subcommittee слегка отличаться в терминологии - slightly differ in terminology


Текст с выделенными словами и переводами:

PART12. SWITCHED ETHERNET Modern Ethernet implementations often look nothing like their **исторический аналог** (historical counterpart). Where long runs of coaxial cable provided attachments for multiple stations in **устаревший Ethernet** (legacy Ethernet), modern Ethernet networks use **витую пару** (twisted pair wiring) or fiber optics to connect stations in a **радиальная модель** (radial pattern). Where **устаревшие Ethernet сети** (legacy Ethernet networks) **передавали данные со скоростью 10 Мбит/с** (transmitted data at 10 megabits per second (Mbps)), modern networks can operate at 100 or even 1,000 Mbps! Perhaps the most striking advancement in **в современных сетях Ethernet** (contemporary Ethernet networks) is the use of switched Ethernet. **Коммутируемые сети заменяют** (Switched networks replace) the shared medium of legacy Ethernet with a dedicated segment for each station (Fig. 4). These segments connect to a switch, which acts much like an Ethernet bridge, but can connect many of these single station segments. Some switches today can **поддерживать сотню отдельных сегментов** (support hundreds of dedicated segments). Since the only devices on the segments are the switch and the end station, the switch picks up every transmission before it reaches another node. The switch then **пересылает фрейм в нужный сегмент** (forwards the frame over the appropriate segment), just like a bridge, but **но, так как** (since) any segment contains only a single node, the frame only **доходит до намеченного получателя** (reaches the intended recipient). This allows many conversations to occur simultaneously on a switched network. PART 13. FULL-DUPLEX ETHERNET Ethernet switching gave rise to another advancement, **дуплексный Ethernet** (full-duplex Ethernet). **Дуплексный Ethernet** (Full-duplex) is a **термин в передаче данных** (data communications term) that refers to the **способность одновременно передавать и принимать данные** (ability to send and receive data at the same time). Legacy Ethernet is half-duplex, meaning information can **перемещаться за раз только в одном направлении** (move in only one direction at a time). In a **полностью коммутируемая сеть** (totally switched network), nodes only communicate with the switch and never directly with each other. Switched networks also **используют или витую пару, или оптиковолокно** (employ either twisted pair or fiber optic cabling), both of which **используют отдельные провода** (use separate conductors) for sending and receiving data. **В этом режиме работы** (In this type of environment), Ethernet stations can **отказываться от процесса выявления конфликтов** (forgo the collision detection process) and transmit at will, since they are the only potential devices that can access the medium. This allows end stations to transmit to the switch at the same time that the switch transmits to them, achieving a **режим работы, исключающий конфликты** (collision-free environment).

**Слова - words**

исторический аналог - historical counterpart устаревший Ethernet - legacy Ethernet использовать - use витую пару - twisted pair радиальная модель - radial pattern передавать данные со скоростью 10 Мбит/с - transmit data at 10 Mbps в современных сетях Ethernet - in modern Ethernet networks коммутируемые сети заменяют - switched networks replace поддерживать сотню отдельных сегментов - support hundreds of dedicated segments пересылать фрейм в нужный сегмент - forward the frame over the appropriate segment но, так как - since доходить до намеченного получателя - reach the intended recipient дуплексный Ethernet - full-duplex Ethernet термин в передаче данных - term in data transmission способность одновременно передавать и принимать данные - ability to simultaneously transmit and receive data перемещаться за раз только в одном направлении - move in only one direction at a time полностью коммутируемая сеть - totally switched network использовать или витую пару, или оптиковолокно - use either twisted pair or fiber optic cable использовать отдельные провода - use separate wires в этом режиме работы - in this operating mode отказываться от процесса выявления конфликтов - forgo the collision detection process режим работы, исключающий конфликты - collision-free operating mode использовать вместо чего-л. - use instead of sth. первоначально относился к сетевым разработкам - initially referred to network developments институт инженеров по электронике и радио электронике - Institute of Electrical and Electronics Engineers (IEEE) создавать комитет - create a committee стандартизировать сетевые технологии - standardize network technologies исследовать различные аспекты создания сети - investigate various aspects of network creation различать каждый подкомитет - distinguish each subcommittee слегка отличаться в терминологии - slightly differ in terminology

Эти слова не были найдены в тексте, предоставленном вами.




# 13-12-20204

A: What is the most striking advancement in contemporary Ethernet network?
B: The most striking advancement in contemporary Ethernet networks is the use of switched Ethernet.

A: Что является самым заметным достижением в современных сетях Ethernet?
B: Самым заметным достижением в современных сетях Ethernet является использование коммутируемого Ethernet.


A: What is the difference between a switch and a bridge?
B: That a switch acts much like an Ethernet bridge, but can connect many single-station segments.

A: В чём разница между коммутатором и мостом?
B: Коммутатор работает примерно как мост Ethernet, но может подключать множество сегментов с одной станцией. 


A: What does the term full-duplex mean?
B: Full-duplex is a data communications term that refers to the ability to send and receive data at the same time.

A: Что означает термин “полный дуплекс”?
B: Полный дуплекс — это термин в области передачи данных, который относится к способности одновременно отправлять и принимать данные.


A: What did “Ethernet” originally refer to?
B: “Ethernet” originally referred to a networking implementation standardized by Digital, Intel, and Xerox; it is also known as the DIX standard.

A: К чему первоначально относился термин “Ethernet”?
B: Первоначально “Ethernet” относился к сетевой реализации, стандартизированной компаниями Digital, Intel и Xerox; она также известна как стандарт DIX.


A: When did the IEEE create a committee to standardize network technologies?
B: The IEEE created a committee to standardize network technologies in February 1980.

A: Когда IEEE создал комитет для стандартизации сетевых технологий?
B: IEEE создал комитет для стандартизации сетевых технологий в феврале 1980 года.


A: Why was this working group titled 802?
B: This working group was titled 802 after the year and month of its formation (February 1980).

A: Почему эта рабочая группа называлась 802?
B: Эта рабочая группа называлась 802 в честь года и месяца её создания (февраль 1980 года).


A: Do Ethernet and 802.3 differ?
B: Ethernet and 802.3 differ slightly in their terminology and the data format for their frames, but are in most respects identical.

A: Отличаются ли Ethernet и 802.3?
B: Ethernet и 802.3 незначительно различаются терминологией и форматом данных в кадрах, но в остальном практически идентичны.


# ЗАДАНИЕ 9

1. **TRUE** - Modern networks can operate at 100 or even 1,000 Mbps. - Современные сети могут работать на скорости 100 или даже 1000 Мбит/с.
    
2. **FALSE** - Switched networks replace the shared medium with a dedicated segment for each station. - Коммутируемые сети заменяют общую среду на выделенный сегмент для каждой станции. - “Switched networks replace the shared medium with a dedicated segment for each five stations.”
    
3. **FALSE** - In full-duplex Ethernet, information can move in both directions simultaneously. - В полнодуплексном Ethernet информация может перемещаться в обоих направлениях одновременно. - “In full-duplex Ethernet information can move in only one direction at a time.”
    
4. **TRUE** - A collision-free environment allows end stations to transmit to the switch at the same time that the switch transmits to them. - Бесколлизионная среда позволяет оконечным станциям передавать данные на коммутатор одновременно с передачей данных от коммутатора к ним.
    
5. **FALSE** - The term 802.3 is used in place of or in conjunction with the term «Ethernet». - Термин 802.3 используется вместо или вместе с термином «Ethernet». - “The term 802.5 is used in place of the term «Ethernet».”
    
6. **FALSE** - In 1980 the Institute of Electrical and Electronics Engineers (IEEE) created a committee to standardize network technologies. - В 1980 году Институт инженеров электротехники и электроники (IEEE) создал комитет для стандартизации сетевых технологий. - “In 1980 the Institute of Ethernet Efficiency Employment created a committee to standardize network technologies.”
    
7. **TRUE** - The IEEE distinguished each subcommittee by numbering it 802.X. - IEEE выделял каждый подкомитет, присваивая ему номер 802.X.
    
8. **FALSE** - Ethernet and 802.3 have slight differences in their terminology and frame data format, but are largely identical. - Ethernet и 802.3 имеют небольшие различия в терминологии и формате данных кадра, но в значительной степени идентичны. - “Ethernet and 802.3 have no difference at all.”


Радиальная модель
Витая пара
Коммутируемые сети
Пересылать фрейм в нужный сегмент
Передавать и принимать данные одновременно
Оптико-волокно
Стандартизировать сетевые технологии 
Режим работы, исключающий конфликты
Использовать отдельные провода
![[Pasted image 20241213115257.png]]

---
### Проверка утверждений:

1. Most networks are not fully switched because it is rather expensive to replace all of the hubs with switches.  
    Большинство сетей не являются полностью коммутируемыми, потому что замена всех концентраторов на коммутаторы довольно дорога.  
    ✅ True (Верно).
    
2. Switches usually work at Layer 3 of the OSI Reference Model.  
    Коммутаторы обычно работают на 3 уровне модели OSI.  
    ❌ False (Ложно).  
    ✅ Исправление: _Switches usually work at Layer 2 of the OSI Reference Model._  
    Коммутаторы обычно работают на 2 уровне модели OSI.
    
3. On any network the concept of a broadcast packet is of no importance to the operability of a network.  
    В любой сети концепция широковещательного пакета не имеет значения для работоспособности сети.  
    ❌ False (Ложно).  
    ✅ Исправление: _On any network, the concept of a broadcast packet is vital to the operability of a network._  
    В любой сети концепция широковещательного пакета критически важна для работоспособности сети.
    
4. Whenever a device needs to send out information but doesn't know who it should send it to, it sends out a broadcast.  
    Когда устройству нужно отправить информацию, но оно не знает, кому, оно отправляет широковещательный пакет.  
    ✅ True (Верно).
    
5. A switch will never pass along any broadcast packets it receives to all the other segments in the broadcast domain.  
    Коммутатор никогда не передаёт полученные широковещательные пакеты в другие сегменты в пределах области широковещательной рассылки.  
    ❌ False (Ложно).  
    ✅ Исправление: _A switch will pass along any broadcast packets it receives to all the other segments in the broadcast domain._  
    Коммутатор передаёт полученные широковещательные пакеты во все остальные сегменты в пределах области широковещательной рассылки.
    
6. LAN switches rely on packet-switching.  
    Коммутаторы локальных сетей основаны на пакетной коммутации.  
    ✅ True (Верно).
    
7. Incoming packets are saved to the switch's look-up table.  
    Входящие пакеты сохраняются в таблице поиска коммутатора.  
    ❌ False (Ложно).  
    ✅ Исправление: _Incoming MAC addresses are saved to the switch's look-up table._  
    Входящие MAC-адреса сохраняются в таблице поиска коммутатора.
    
8. Cut-through switches save the entire packet to the buffer and check it for CRC errors or other problems before sending.  
    Коммутаторы с методом cut-through сохраняют весь пакет в буфер и проверяют его на ошибки CRC или другие проблемы перед отправкой.  
    ❌ False (Ложно).  
    ✅ Исправление: _Store-and-forward switches save the entire packet to the buffer and check it for CRC errors or other problems before sending._  
    Коммутаторы с методом store-and-forward сохраняют весь пакет в буфер и проверяют его на ошибки CRC или другие проблемы перед отправкой.
    
9. Many switches combine the two methods, using cut-through until a certain error level is reached and then changing over to store-and-forward.  
    Многие коммутаторы совмещают два метода, используя cut-through до достижения определённого уровня ошибок, а затем переключаясь на store-and-forward.  
    ✅ True (Верно).
    
10. A switch using a fragment-free method stores the first 6 bytes of the packet before sending it on.  
    Коммутатор, использующий метод fragment-free, сохраняет первые 6 байтов пакета перед его отправкой.  
    ❌ False (Ложно).  
    ✅ Исправление: _A switch using a fragment-free method stores the first 64 bytes of the packet before sending it on._  
    Коммутатор, использующий метод fragment-free, сохраняет первые 64 байта пакета перед его отправкой.


