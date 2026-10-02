'use strict';

/* SMR Hub — datos estáticos
   Sin lógica de interfaz. Todas las páginas leen de aquí. */

window.SMR_DATA = {
  categories: [
    'Redes',
    'Sistemas Operativos',
    'Hardware',
    'Seguridad',
    'Ofimática',
    'Virtualización',
    'Mantenimiento'
  ],

  /* Actividad simulada de la página de inicio */
  activity: [
    { title: 'Test de Redes Básicas', meta: 'Tests · hace 2 días', hash: '#/tests' },
    { title: 'Calculadora de subredes', meta: 'Herramientas · ayer', hash: '#/herramientas' },
    { title: 'Consulta de puertos TCP', meta: 'Redes · hace 3 días', hash: '#/redes' }
  ],

  resources: [
    {
      id: 'r-red-ipv4',
      title: 'Direccionamiento IPv4',
      desc: 'Estructura de una dirección IPv4, máscaras, rangos privados y notación CIDR.',
      category: 'Redes',
      level: 'Básico',
      added: '2024-09-12',
      content: [
        'Una dirección IPv4 tiene 32 bits divididos en cuatro octetos.',
        'La máscara separa la parte de red de la parte de host.',
        'Rangos privados: 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16.',
        'La notación CIDR indica el número de bits de red: /24 equivale a 255.255.255.0.',
        'La dirección de red identifica la subred y la de broadcast llega a todos sus hosts.'
      ]
    },
    {
      id: 'r-red-subnetting',
      title: 'Subnetting paso a paso',
      desc: 'Cómo dividir una red en subredes: préstamo de bits, salto de red y cálculo de rangos.',
      category: 'Redes',
      level: 'Intermedio',
      added: '2024-10-03',
      content: [
        'Determina cuántas subredes o hosts necesitas antes de tocar bits.',
        'Cada bit prestado del bloque de host duplica el número de subredes.',
        'El salto entre subredes se calcula como 256 menos la máscara extendida.',
        'Dirección de red: primera del bloque; broadcast: última; hosts útiles: las intermedias.',
        'Comprueba que el número de hosts cabe en los bits restantes: 2^h − 2.'
      ]
    },
    {
      id: 'r-red-osi',
      title: 'Modelo OSI y encapsulación',
      desc: 'Las siete capas del modelo OSI, las PDU de cada nivel y cómo descienden los datos.',
      category: 'Redes',
      level: 'Básico',
      added: '2024-09-20',
      content: [
        'Cada capa ofrece servicios a la superior y usa las de la inferior.',
        'PDU por nivel: bits, tramas, paquetes, segmentos y datos.',
        'La encapsulación añade cabeceras al bajar; al recibir se desencapsulan en orden inverso.',
        'Los niveles 1 a 3 se ocupan del transporte de bits; los superiores, de extremo a extremo.',
        'El modelo TCP/IP agrupa esas siete capas en cuatro.'
      ]
    },
    {
      id: 'r-red-arp-dhcp',
      title: 'ARP y DHCP',
      desc: 'Cómo un equipo resuelve direcciones MAC y cómo obtiene su configuración de red.',
      category: 'Redes',
      level: 'Básico',
      added: '2024-11-14',
      content: [
        'ARP pregunta en difusión quién tiene una IP y responde el propietario con su MAC.',
        'La tabla ARP se guarda en caché y expira si no se renueva.',
        'DHCP entrega IP, máscara, gateway y DNS mediante DORA: discover, offer, request, ack.',
        'El lease define cuánto tiempo conserva el cliente la dirección.',
        'Sin servidor DHCP, el cliente se asigna una dirección APIPA 169.254.x.x.'
      ]
    },
    {
      id: 'r-so-windows',
      title: 'Instalación de Windows',
      desc: 'Requisitos, particionado y pasos de una instalación limpia de Windows 10 y 11.',
      category: 'Sistemas Operativos',
      level: 'Básico',
      added: '2024-09-28',
      content: [
        'Comprueba requisitos: en Windows 11, TPM 2.0 y UEFI con Secure Boot.',
        'Crea el medio de instalación con la herramienta oficial en un USB de 8 GB o más.',
        'En equipos UEFI el disco se particiona en GPT; con BIOS legacy, en MBR.',
        'El asistente crea la partición de sistema y la partición EFI automáticamente.',
        'Documenta la clave de producto y la cuenta antes de formatear.'
      ]
    },
    {
      id: 'r-so-particiones',
      title: 'MBR, GPT y sistemas de archivos',
      desc: 'Diferencias entre estilos de partición y entre NTFS, FAT32 y ext4.',
      category: 'Sistemas Operativos',
      level: 'Intermedio',
      added: '2024-10-18',
      content: [
        'MBR admite cuatro particiones primarias y discos de hasta 2 TB.',
        'GPT permite más particiones y discos mayores, con tabla redundante.',
        'NTFS soporta permisos, cifrado y archivos de más de 4 GB; FAT32 no.',
        'ext4 es el sistema habitual en Linux: journaling y buena recuperación ante fallos.',
        'ExFAT se usa en unidades externas cuando hacen falta compatibilidad y archivos grandes.'
      ]
    },
    {
      id: 'r-so-procesos',
      title: 'Procesos y servicios en Windows',
      desc: 'Administrador de tareas, services.msc y arranque automático de programas.',
      category: 'Sistemas Operativos',
      level: 'Intermedio',
      added: '2024-11-02',
      content: [
        'Un proceso ejecuta código; un servicio trabaja en segundo plano sin sesión de usuario.',
        'El Administrador de tareas muestra consumo de CPU, memoria y disco por proceso.',
        'services.msc permite iniciar, detener y cambiar el tipo de arranque de cada servicio.',
        'msconfig y el Administrador de tareas controlan qué arranca con el sistema.',
        'Antes de finalizar un proceso desconocido, identifica su ruta y editor.'
      ]
    },
    {
      id: 'r-so-linux-cli',
      title: 'Terminal de Linux: primeros comandos',
      desc: 'Navegación por directorios, permisos básicos e instalación de paquetes.',
      category: 'Sistemas Operativos',
      level: 'Básico',
      added: '2024-12-06',
      content: [
        'pwd muestra la ruta actual; cd cambia de directorio; ls lista el contenido.',
        'chmod modifica permisos de lectura, escritura y ejecución para usuario, grupo y otros.',
        'chown cambia el propietario de un archivo, normalmente con sudo.',
        'apt update y apt install gestionan paquetes en Debian y Ubuntu.',
        'man comando muestra el manual completo; --help, un resumen rápido.'
      ]
    },
    {
      id: 'r-hw-componentes',
      title: 'Componentes de un equipo',
      desc: 'Identificación de placa, procesador, memoria, almacenamiento y fuente.',
      category: 'Hardware',
      level: 'Básico',
      added: '2024-09-15',
      content: [
        'La placa base determina el socket del procesador y el tipo de memoria.',
        'El chipset define puertos, líneas PCIe y posibilidades de ampliación.',
        'La fuente debe cubrir el consumo con margen; revisa certificación y conectores.',
        'Herramientas como CPU-Z o el propio sistema identifican el hardware instalado.',
        'Antes de abrir el equipo, desconecta la corriente y descarga la electricidad estática.'
      ]
    },
    {
      id: 'r-hw-ram',
      title: 'Memoria RAM: tipos y ampliación',
      desc: 'Generaciones DDR, canales y compatibilidad al ampliar memoria.',
      category: 'Hardware',
      level: 'Intermedio',
      added: '2024-10-25',
      content: [
        'DDR, DDR2, DDR3 y DDR4 no son compatibles entre sí: cambia el voltaje y la muesca.',
        'La frecuencia efectiva y las temporizaciones determinan el rendimiento.',
        'Dos módulos idénticos activan el doble canal y duplican el ancho de banda.',
        'Consulta el manual de la placa para conocer máximo soportado y ranuras pareadas.',
        'MemTest86 permite verificar la estabilidad de los módulos instalados.'
      ]
    },
    {
      id: 'r-hw-discos',
      title: 'Discos duros y unidades SSD',
      desc: 'HDD frente a SSD, interfaces SATA y NVMe y salud del disco.',
      category: 'Hardware',
      level: 'Básico',
      added: '2024-11-20',
      content: [
        'Un HDD guarda datos en platos magnéticos; su cuello de botella es mecánico.',
        'Un SSD almacena en celdas NAND, sin partes móviles y con acceso casi instantáneo.',
        'SATA limita a unos 550 MB/s; NVMe sobre PCIe multiplica esa cifra.',
        'Los valores SMART anticipan fallos: sectores reasignados o errores de lectura.',
        'El TRIM ayuda a mantener el rendimiento de escritura en unidades SSD.'
      ]
    },
    {
      id: 'r-seg-contrasenas',
      title: 'Contraseñas y autenticación',
      desc: 'Criterios de contraseñas robustas, gestores y segundo factor.',
      category: 'Seguridad',
      level: 'Básico',
      added: '2024-09-08',
      content: [
        'La longitud importa más que la complejidad: frases largas y únicas.',
        'Un gestor de contraseñas evita reutilizarlas y las guarda cifradas.',
        'El segundo factor añade algo que tienes o algo que eres a algo que sabes.',
        'Cambia de inmediato cualquier credencial aparecida en filtraciones.',
        'No envíes contraseñas por correo ni por mensajería sin cifrar.'
      ]
    },
    {
      id: 'r-seg-malware',
      title: 'Malware: tipos y prevención',
      desc: 'Virus, troyanos, ransomware, spyware y buenas prácticas de defensa.',
      category: 'Seguridad',
      level: 'Intermedio',
      added: '2024-10-30',
      content: [
        'El ransomware cifra los datos y exige rescate: la copia de seguridad es la defensa principal.',
        'Los troyanos se disfrazan de software legítimo para abrir la puerta a otros ataques.',
        'El spyware recopila información sin consentimiento; el adware muestra publicidad.',
        'Mantén el sistema y el antivirus actualizados y desconfía de adjuntos inesperados.',
        'Ante una infección, desconecta la red antes de analizar y limpiar el equipo.'
      ]
    },
    {
      id: 'r-seg-backup',
      title: 'Copias de seguridad 3-2-1',
      desc: 'La regla 3-2-1 aplicada a un equipo personal o a una pequeña red.',
      category: 'Seguridad',
      level: 'Básico',
      added: '2024-12-12',
      content: [
        'Tres copias de los datos, en dos soportes distintos y una fuera del lugar.',
        'Automatiza las copias: las manuales se abandonan en cuanto pasa el apuro inicial.',
        'Verifica las restauraciones; una copia que no se ha probado no es una copia.',
        'Versiona: conserva varias fechas para recuperarte de un borrado antiguo.',
        'Cifra las copias que salen del centro o de la casa.'
      ]
    },
    {
      id: 'r-ofi-texto',
      title: 'Documentos de texto con estilo',
      desc: 'Estilos, índices automáticos y estructuración de documentos largos.',
      category: 'Ofimática',
      level: 'Básico',
      added: '2024-10-08',
      content: [
        'Los estilos separan el contenido del formato y hacen el documento mantenible.',
        'Un índice automático se genera a partir de los niveles de título aplicados.',
        'Las secciones permiten numerar páginas y orientaciones distintas en un mismo archivo.',
        'Usa saltos de página, no líneas vacías, para cambiar de página.',
        'El corrector y la revisión de estilos evitan inconsistencias antes de imprimir.'
      ]
    },
    {
      id: 'r-ofi-hoja',
      title: 'Hojas de cálculo: fórmulas y funciones',
      desc: 'Referencias relativas y absolutas, funciones básicas y gráficos.',
      category: 'Ofimática',
      level: 'Intermedio',
      added: '2024-11-25',
      content: [
        'Una referencia absoluta ($A$1) no cambia al copiar la fórmula; la relativa sí.',
        'SUMA, PROMEDIO, CONTAR, SI y BUSCARV cubren la mayoría de necesidades básicas.',
        'Separa datos de presentación: una hoja de cálculo no es un formulario de papel.',
        'Elige el tipo de gráfico según lo que se compara: tendencia, proporción o distribución.',
        'Los formatos condicionales y la validación de datos reducen errores de entrada.'
      ]
    },
    {
      id: 'r-ofi-presentaciones',
      title: 'Estructura de presentaciones',
      desc: 'Organización del contenido, patrón de diapositivas y criterios visuales.',
      category: 'Ofimática',
      level: 'Básico',
      added: '2024-12-18',
      content: [
        'Define el guion antes de abrir la aplicación: una idea por diapositiva.',
        'El patrón de diapositivas unifica tipografía, colores y logotipos.',
        'Poco texto por diapositiva: la explicación la da quien presenta.',
        'Usa el mismo tamaño de fuente en el cuerpo y jerarquiza con títulos.',
        'Exporta a PDF cuando el destino sea imprimir o compartir sin edición.'
      ]
    },
    {
      id: 'r-virt-virtualbox',
      title: 'Máquinas virtuales con VirtualBox',
      desc: 'Creación de una máquina virtual, instantáneas y modos de red.',
      category: 'Virtualización',
      level: 'Básico',
      added: '2024-10-12',
      content: [
        'Asigna a la máquina memoria y CPU razonables dejando margen al anfitrión.',
        'Las instantáneas guardan el estado y permiten volver atrás tras una prueba.',
        'El modo NAT da salida a internet sin exponer la máquina en la red local.',
        'El modo puente conecta la máquina a la red como si fuera otro equipo físico.',
        'Las Guest Additions mejoran resolución, portapapeles y rendimiento gráfico.'
      ]
    },
    {
      id: 'r-virt-conceptos',
      title: 'Conceptos de virtualización',
      desc: 'Hipervisores de tipo 1 y 2, imágenes, snapshots y ventajas del aislamiento.',
      category: 'Virtualización',
      level: 'Intermedio',
      added: '2024-11-08',
      content: [
        'Un hipervisor de tipo 1 corre sobre el hardware; el de tipo 2, sobre un sistema anfitrión.',
        'Cada máquina virtual dispone de CPU, memoria y disco virtual propios.',
        'Las plantillas permiten desplegar sistemas idénticos en minutos.',
        'El aislamiento hace de la virtualización una herramienta ideal para prácticas seguras.',
        'La sobreasignación de recursos funciona si no se alcanzan los picos a la vez.'
      ]
    },
    {
      id: 'r-virt-redes',
      title: 'Redes virtuales',
      desc: 'Conmutadores virtuales, VLAN en entornos virtualizados y laboratorios de red.',
      category: 'Virtualización',
      level: 'Avanzado',
      added: '2025-01-08',
      content: [
        'Un hipervisor crea conmutadores virtuales que conectan las máquinas entre sí y con el exterior.',
        'Las VLAN etiquetan el tráfico y permiten separar redes sobre el mismo cable.',
        'Un laboratorio con varias máquinas y una que haga de router reproduce una red real.',
        'Las redes internas aíslan máquinas sin salida al anfitrión: útiles para pruebas.',
        'Documenta la topología antes de levantar el laboratorio; ahorra horas de depuración.'
      ]
    },
    {
      id: 'r-man-preventivo',
      title: 'Mantenimiento preventivo',
      desc: 'Limpieza, temperaturas, actualizaciones y comprobaciones periódicas.',
      category: 'Mantenimiento',
      level: 'Básico',
      added: '2024-09-30',
      content: [
        'El polvo obstruye disipadores y ventiladores: revisa el equipo cada pocos meses.',
        'Vigila las temperaturas en carga; un sobrecalentamiento anticipa averías.',
        'Mantén el sistema, los controladores y el firmware al día con copia previa.',
        'Comprueba el estado S.M.A.R.T. de los discos y el espacio libre en las particiones.',
        'Documenta cada intervención con fecha, equipo y acciones realizadas.'
      ]
    },
    {
      id: 'r-man-diagnostico',
      title: 'Diagnóstico de averías',
      desc: 'Metodología de identificación, hipótesis, pruebas y documentación.',
      category: 'Mantenimiento',
      level: 'Intermedio',
      added: '2024-12-02',
      content: [
        'Recoge primero la máxima información: qué cambió, cuándo y qué mensajes aparecen.',
        'Formula una hipótesis simple y pruébala antes de desmontar nada.',
        'Aísla el problema: un componente cada vez, de lo general a lo específico.',
        'Comprueba lo evidente: alimentación, cables, periféricos y configuración.',
        'Registra el diagnóstico y la solución; la siguiente avería lo agradecerá.'
      ]
    },
    {
      id: 'r-man-drivers',
      title: 'Controladores y firmware',
      desc: 'Actualización de controladores, BIOS y UEFI sin comprometer el equipo.',
      category: 'Mantenimiento',
      level: 'Intermedio',
      added: '2025-01-14',
      content: [
        'Descarga controladores solo del fabricante de la placa o del dispositivo.',
        'Si el equipo funciona estable, no actualices controladores sin un motivo concreto.',
        'Las actualizaciones de BIOS/UEFI corrigen compatibilidad y fallos de seguridad.',
        'Nunca interrumpas un flasheo de firmware: puede dejar la placa inutilizable.',
        'Crea un punto de restauración antes de tocar controladores gráficos o de chipset.'
      ]
    },
    {
      id: 'r-man-montaje',
      title: 'Montaje de un equipo',
      desc: 'Orden de montaje, tornillería, cableado y primera puesta en marcha.',
      category: 'Mantenimiento',
      level: 'Básico',
      added: '2025-01-20',
      content: [
        'Monta primero procesador, disipador y memoria fuera de la caja: más cómodo y visible.',
        'Protege la placa con la bolsa antiestática y trabaja sin alfombra ni ropa de lana.',
        'Coloca separadores solo donde la placa tiene agujeros.',
        'Gestiona el cableado para no bloquear el flujo de aire de los ventiladores.',
        'Antes de cerrar, comprueba los conectores de alimentación y que el equipo complete el POST.'
      ]
    }
  ],

  glossary: [
    { id: 'g-arp', term: 'ARP', definition: 'Protocolo que asocia una dirección IP con una dirección MAC dentro de una red local, consultando por difusión y guardando el resultado en una tabla.' },
    { id: 'g-bios', term: 'BIOS', definition: 'Firmware clásico de las placas base que inicializa el hardware al encender y cede el control al cargador de arranque. Ha sido sustituido progresivamente por UEFI.' },
    { id: 'g-bit', term: 'Bit', definition: 'Unidad mínima de información: un 0 o un 1. Con n bits se representan 2^n valores distintos.' },
    { id: 'g-byte', term: 'Byte', definition: 'Conjunto de 8 bits. Es la unidad habitual para medir archivos y memoria.' },
    { id: 'g-cache', term: 'Caché', definition: 'Memoria pequeña y rápida que guarda datos de uso frecuente para evitar acceder a un nivel más lento.' },
    { id: 'g-cpu', term: 'CPU', definition: 'Procesador central. Ejecuta las instrucciones del sistema y de los programas; su rendimiento depende de frecuencia, núcleos y caché.' },
    { id: 'g-dhcp', term: 'DHCP', definition: 'Servicio que asigna automáticamente a cada equipo su dirección IP, máscara, gateway y servidores DNS.' },
    { id: 'g-dns', term: 'DNS', definition: 'Sistema que resuelve nombres de dominio en direcciones IP, de forma que no haya que memorizar direcciones numéricas.' },
    { id: 'g-driver', term: 'Driver', definition: 'Software que permite al sistema operativo comunicarse con un dispositivo concreto de hardware.' },
    { id: 'g-ethernet', term: 'Ethernet', definition: 'Familia de estándares de red cableada más extendida. Actualmente domina la variante conmutada a 100 Mbps, 1 Gbps y superiores.' },
    { id: 'g-firewall', term: 'Firewall', definition: 'Sistema que filtra el tráfico de red según reglas definidas, permitiendo o bloqueando conexiones.' },
    { id: 'g-firmware', term: 'Firmware', definition: 'Software grabado en un dispositivo que controla su funcionamiento básico. Se actualiza mediante flasheos específicos.' },
    { id: 'g-gateway', term: 'Gateway', definition: 'Nodo que conecta redes distintas. En una red doméstica suele ser la dirección del router.' },
    { id: 'g-hdd', term: 'HDD', definition: 'Disco duro mecánico. Almacena datos en platos magnéticos giratorios; gran capacidad, menor velocidad que un SSD.' },
    { id: 'g-http', term: 'HTTP', definition: 'Protocolo de transferencia de hipertexto, base de la web. Envía el tráfico sin cifrar.' },
    { id: 'g-https', term: 'HTTPS', definition: 'Versión de HTTP protegida con TLS: cifra la comunicación y autentica el servidor mediante certificados.' },
    { id: 'g-ip', term: 'IP', definition: 'Dirección lógica que identifica a un equipo en una red. IPv4 usa 32 bits; IPv6, 128.' },
    { id: 'g-kernel', term: 'Kernel', definition: 'Núcleo del sistema operativo: gestiona memoria, procesos, dispositivos y la comunicación con el hardware.' },
    { id: 'g-mac', term: 'MAC', definition: 'Dirección física de 48 bits grabada en la tarjeta de red, única por fabricante y usada en el nivel de enlace.' },
    { id: 'g-nat', term: 'NAT', definition: 'Traducción de direcciones que permite a varias máquinas de una red privada salir a internet compartiendo una IP pública.' },
    { id: 'g-ping', term: 'Ping', definition: 'Herramienta que envía paquetes ICMP de eco para comprobar conectividad y medir latencia.' },
    { id: 'g-proxy', term: 'Proxy', definition: 'Intermediario entre cliente y servidor. Se usa para filtrar, cachear o anonimizar el tráfico.' },
    { id: 'g-raid', term: 'RAID', definition: 'Conjunto de técnicas que combinan varios discos para ganar redundancia, rendimiento o ambas cosas.' },
    { id: 'g-ram', term: 'RAM', definition: 'Memoria volátil de trabajo. Su contenido se pierde al apagar; su cantidad limita cuánto puede tener abierto el sistema.' },
    { id: 'g-router', term: 'Router', definition: 'Dispositivo que encamina paquetes entre redes distintas, decidiendo la ruta según sus tablas y las direcciones IP.' },
    { id: 'g-ssh', term: 'SSH', definition: 'Protocolo que permite abrir sesiones remotas cifradas sobre TCP, habitualmente en el puerto 22.' },
    { id: 'g-ssd', term: 'SSD', definition: 'Unidad de estado sólido. Almacena en memoria NAND sin partes móviles; mucho más rápida que un HDD.' },
    { id: 'g-switch', term: 'Switch', definition: 'Conmutador de red local. Aprende las direcciones MAC y reenvía cada trama solo al puerto correspondiente.' },
    { id: 'g-subnetting', term: 'Subnetting', definition: 'División de una red en subredes más pequeñas tomando bits del bloque de host para la parte de red.' },
    { id: 'g-tcp', term: 'TCP', definition: 'Protocolo de transporte orientado a conexión: garantiza la entrega ordenada y sin errores de los segmentos.' },
    { id: 'g-udp', term: 'UDP', definition: 'Protocolo de transporte sin conexión: envía datagramas sin garantías, a cambio de menos latencia.' },
    { id: 'g-uefi', term: 'UEFI', definition: 'Firmware moderno que sustituye al BIOS: arranque desde GPT, Secure Boot y una interfaz más completa.' },
    { id: 'g-virtualizacion', term: 'Virtualización', definition: 'Capa de software (hipervisor) que ejecuta varios sistemas aislados sobre una misma máquina física.' },
    { id: 'g-vlan', term: 'VLAN', definition: 'Red local virtual. Segmenta un switch físico en varias redes lógicas independientes mediante etiquetas 802.1Q.' },
    { id: 'g-vpn', term: 'VPN', definition: 'Red privada virtual. Crea un túnel cifrado entre dos puntos para extender una red privada a través de una pública.' }
  ]
};
