export default {
  route: {
    dashboard: 'Dashboard',
    introduction: 'Introduction',
    documentation: 'Documentation',
    permission: 'Permission',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Edit Article',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createForm: 'Create Form',
    editForm: 'Edit Form',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    authorityManage: 'SUIM Manage',
    role: 'Role Manage',
    authority: 'Authority Manage',
    group: 'Group Manage',
    adminManage: 'Admin Manage',
    bidManage: 'Bid Manage',
    purchaseRecord: 'Purchase Record',
    supplyRecord: 'Supply Record',
    systemParame: 'System Parame',
    appBanner: 'Banner',
    fruitTypes: 'Fruit Types',
    purchaseManage: 'Purchase Manage',
    supplyManage: 'Supply Manage',
    gymNasium: 'Gymnasium',
    gym: 'gym',
    personal: 'Personal Class',
    open: 'Class Manage',
    people: 'Personal Manage',
    entrance: 'Entrance Manage',
    gymDetails: 'Gym Details',
    anthropometer: 'Anthropometer Manage',
    data: 'Data Manage',
    userData: 'User Data',
    userRemind: 'User Remind',
    information: 'Article Manager',
    bill: 'Bill Manage',
    finance: 'Finance Manage',
    recommend: 'Recommend',
    exercise: 'Movement Plan',
    diet: 'Diet Plan',
    activity: 'Activity',
    feedback: 'Feedback'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    theme: 'theme'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  dashboard: {
    totalRegisteredUsers: 'Total Registered Users',
    newRegisteredUserToday: 'New Registered User Today',
    totalOrdersToday: 'Total Orders Today',
    totalOrdersCompletedToday: 'Total Orders Completed Today',
    totalOrderPaymentToday: 'Total Order Payment Today',
    newRegisteredUserWeek: 'Weekly New Users'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'Reviewer',
    id: 'ID',
    roleName: 'Role Name',
    jurisdiction: 'Jurisdiction',
    creator: 'Creator',
    createDate: 'Create Date',
    updated: 'Updated',
    menu: 'menu',
    permission: 'permission',
    requestType: 'Request Type',
    url: 'Url',
    group: 'Group',
    admin: 'Administrator',
    accountDTO: 'UserID',
    coin: 'coin',
    bonus: 'bonus',
    content: 'content',
    recordStatus: 'Record Status',
    billID: 'BillID',
    accountId: 'SellerID',
    accountNo: 'AccountNo',
    amount: 'Amount',
    channel: 'Channel of disbursement',
    crtTime: 'Generated time',
    lastTime: 'Next time',
    orderNo: 'Bill Number',
    quantity: 'Quantity',
    // 门禁管理
    openAppid: 'OpenAppid',
    openAppsecret: 'OpenAppsecret',
    openId: 'OpenId',
    position: 'Position',
    qr: 'Qr Code Address',
    sharingGymId: 'Sharing GymId',
    // 用户反馈
    read: 'Read',
    unread: 'Unread',
    markedRead: 'Marked Read',
    markedUnread: 'Marked Unread',
    state: 'Payment State',
    changePayment: 'Change Payment State',
    userDTO: 'User Object',
    userId: 'UserID',
    date: 'Date',
    totalPrice: 'Total Price',
    numbersOfItems: 'Numbers Of Items',
    item: 'Item',
    itemType: 'ItemType',
    itemPrice: 'Item Price',
    times: 'Frequency',
    singlePrice: 'Single Price',
    startTime: 'Start Time',
    time: 'Create Time',
    menuList: 'Menu List',
    resources: 'Resources',
    operations: 'Operations',
    fix: 'isFix',
    lastUser: 'Last Update',
    groupName: 'Group Name',
    sysRoleDTO: 'The role of',
    email: 'Email',
    gender: 'Gender',
    mobile: 'Mobile',
    nickname: 'NickName',
    portrait: 'Portrait',
    username: 'UserName',
    crtUser: 'Feedback UserID',
    feedback: 'Content Feedback',
    provider: 'Provider',
    feedcrtTime: 'Feedback Time',
    feedState: 'isRead',
    userDetails: 'User Details',
    classDetails: 'Class Details',
    personDetails: 'Person Details',
    accountType: 'AccountType',
    // 账号管理
    stature: 'Stature',
    birthday: 'Birthday',
    caseHistory: 'Case History',
    region: 'Region',
    fitnessExperience: 'Fitness Experience',
    gexinCid: 'RecurrenceID',
    goal: 'Goal',
    identity: 'Identity',
    lat: 'Latitude',
    lng: 'Longitude',
    latLng: 'Longitude and Latitude',
    model: 'Phone Model',
    signature: 'Signature',
    weight: 'Weight',
    status: 'Status',
    actions: 'Actions',
    accountDetails: 'Account Details',
    billDetails: 'Bill Details',
    deposit: 'Deposit',
    depositType: 'Deposit Type',
    balance: 'Balance',
    voucher: 'Voucher Number',
    freeExperienceTime: 'Free Experience Time',
    depositLastTime: 'Deposit LastTime',
    depositExpiration: 'Deposit Expiration',
    balanceLastTime: 'Balance LastTime',
    changeStatus: 'Change Status',
    no: 'No',
    // 课程管理
    audience: 'Audience',
    brief: 'Brief',
    currencyType: 'CurrencyType',
    deadline: 'Deadline',
    beginTime: 'BeginTime',
    endTime: 'EndTime',
    traineeMaximum: 'TraineeMaximum',
    traineeMinimum: 'TraineeMinimum',
    instructorId: 'InstructorID',
    describe: 'Describe',
    discount: 'IsDiscount',
    gymid: 'GymID',
    gym: 'Gym',
    instructors: 'Instructor',
    maximum: 'Maximum',
    method: 'Method',
    minimum: 'Minimum',
    price: 'Price',
    promotions: 'Promotion Group',
    specification: 'Specification',
    classType: 'ClassType',
    weekenday: 'Weekenday',
    address: 'Address',
    args1: 'Args1',
    WillNum: 'Class Size',
    args2: 'Args2',
    city: 'City',
    closingTime: 'ClosingTime',
    country: 'Country',
    cover: 'Cover',
    district: 'District',
    mobiles: 'Mobiles',
    label: 'Label',
    openingTime: 'OpeningTime',
    phones: 'Phones',
    pictures: 'Pictures',
    province: 'Province',
    // 私教管理
    crtAdmin: 'Create Administrator',
    entryTime: 'EntryTime',
    lastAdmin: 'LastAdmin',
    major: 'Major',
    name: 'Name',
    schedule: 'Schedule',
    score: 'Score',
    technical: 'Technical',
    // edit
    details: 'Details',
    edit: 'Edit',
    draft: 'Draft',
    published: 'Published',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    update: 'Update',
    create: 'Create'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export selected items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Theme change',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  }
}
