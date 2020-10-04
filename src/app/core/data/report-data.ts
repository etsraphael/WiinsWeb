export const reportData: ReportData[] = [
    {
        number: 1,
        type: 'REPORT.Code-Categorie.1',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.1.1',
            'REPORT.Report-Modal-Message.Descriptions.1.2',
            'REPORT.Report-Modal-Message.Descriptions.1.3',
            'REPORT.Report-Modal-Message.Descriptions.1.4',
            'REPORT.Report-Modal-Message.Descriptions.1.5',
            'REPORT.Report-Modal-Message.Descriptions.1.6',
            'REPORT.Report-Modal-Message.Descriptions.1.7'
        ]
    },
    {
        number: 2,
        type: 'REPORT.Code-Categorie.2',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.2.1',
            'REPORT.Report-Modal-Message.Descriptions.2.2',
            'REPORT.Report-Modal-Message.Descriptions.2.3'
        ]
    },
    {
        number: 3,
        type: 'REPORT.Code-Categorie.3',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.3.1',
            'REPORT.Report-Modal-Message.Descriptions.3.2',
            'REPORT.Report-Modal-Message.Descriptions.3.3'
        ]
    },
    {
        number: 4,
        type: 'REPORT.Code-Categorie.4',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.4.1',
            'REPORT.Report-Modal-Message.Descriptions.4.2',
            'REPORT.Report-Modal-Message.Descriptions.4.3',
            'REPORT.Report-Modal-Message.Descriptions.4.4',
            'REPORT.Report-Modal-Message.Descriptions.4.5',
            'REPORT.Report-Modal-Message.Descriptions.4.6',
            'REPORT.Report-Modal-Message.Descriptions.4.7',
            'REPORT.Report-Modal-Message.Descriptions.4.8'
        ]
    },
    {
        number: 5,
        type: 'REPORT.Code-Categorie.5',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.5.1'
        ]
    },
    {
        number: 6,
        type: 'REPORT.Code-Categorie.6',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.6.1',
            'REPORT.Report-Modal-Message.Descriptions.6.2',
            'REPORT.Report-Modal-Message.Descriptions.6.3'
        ]
    },
    {
        number: 7,
        type: 'REPORT.Code-Categorie.7',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.7.1'
        ]
    },
    {
        number: 8,
        type: 'REPORT.Code-Categorie.8',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.8.1',
            'REPORT.Report-Modal-Message.Descriptions.8.2'
        ]
    },
    {
        number: 9,
        type: 'REPORT.Code-Categorie.9',
        descriptions: [
            'REPORT.Report-Modal-Message.Descriptions.9.1',
            'REPORT.Report-Modal-Message.Descriptions.9.2'
        ]
    }
]

export interface ReportData {
    number: number,
    type: string
    descriptions: string[]
}